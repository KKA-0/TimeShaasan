const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    status: {
      type: Number,
      default: 0
    }
})

const checklistSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  checklist: [taskSchema]
});

const CheckList = mongoose.model('CheckList', checklistSchema);
module.exports = CheckList;