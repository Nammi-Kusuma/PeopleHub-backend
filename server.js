import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import personRoutes from './routes/person.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/person', personRoutes);

mongoose.connect(process.env.mongodb_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
