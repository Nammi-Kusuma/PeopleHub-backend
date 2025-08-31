import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 120
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    mobileNumber: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/,
        unique: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Person', personSchema);