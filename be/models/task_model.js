// models/User.js
const mongoose = require('mongoose');

// Create a new Mongoose model for the todo list
const TaskSchema = new mongoose.Schema({
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
  });
  
  

module.exports = mongoose.model('Task', TaskSchema);
