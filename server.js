require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Feedback = require('./feedback'); // Import the feedback model

const app = express();

app.use(cors());
app.use(express.json());

// Use environment variable for MongoDB URI
const uri = process.env.MONGODB_URI;

// Connect to MongoDB (Remove deprecated options)
mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

// Sample route to test server connection
app.get('/data', (req, res) => {
    res.json({ message: "Hello from MongoDB!" });
});

// Route for submitting feedback
app.post('/feedback', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newFeedback = new Feedback({ name, email, message });
        await newFeedback.save();
        res.json({ message: 'Feedback submitted successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error saving feedback', error: err.message });
    }
});

// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
