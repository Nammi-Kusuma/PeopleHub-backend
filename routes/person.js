import express from 'express';
const router = express.Router();
import Person from '../models/person.js';

router.get('/', async (req, res) => {
    try {
        const persons = await Person.find({});
        res.json(persons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.json(person);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, age, gender, mobileNumber } = req.body;
        
        if (!name || !age || !gender || !mobileNumber) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const person = new Person({
            name,
            age,
            gender,
            mobileNumber
        });

        const newPerson = await person.save();
        res.status(201).json(newPerson);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Mobile number already exists' });
        }
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, age, gender, mobileNumber } = req.body;
        
        if (!name || !age || !gender || !mobileNumber) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const updatedPerson = await Person.findByIdAndUpdate(
            req.params.id,
            { name, age, gender, mobileNumber },
            { new: true, runValidators: true }
        );

        if (!updatedPerson) {
            return res.status(404).json({ message: 'Person not found' });
        }

        res.json(updatedPerson);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Mobile number already exists' });
        }
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedPerson = await Person.findByIdAndDelete(req.params.id);
        
        if (!deletedPerson) {
            return res.status(404).json({ message: 'Person not found' });
        }

        res.json({ message: 'Person deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
