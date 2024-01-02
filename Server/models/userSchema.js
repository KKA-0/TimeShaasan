const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  todo_id: {
    type: String,
  },
  checklist_id: {
    type: String,
  },
  focussession_id: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;