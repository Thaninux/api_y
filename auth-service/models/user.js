const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  passwordReminder: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
