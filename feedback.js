// Import the mongoose library, which is used to interact with MongoDB in a Node.js application
const mongoose = require('mongoose');

// Define a new schema for the 'Feedback' collection using mongoose.Schema
const feedbackSchema = new mongoose.Schema({
  // 'name' field (required, must be a string)
  name: { type: String, required: true, trim: true },

  // 'email' field (required, must be a valid email format)
  email: { 
    type: String, 
    required: true, 
    trim: true, 
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },

  // 'message' field (required, must be at least 5 characters long)
  message: { type: String, required: true, minlength: 5 },

  // 'date' field (automatically set to the current date when a new document is created)
  date: { type: Date, default: Date.now }
});

// Create a Mongoose model named 'Feedback' based on the schema
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Export the Feedback model so it can be used in server.js
module.exports = Feedback;
