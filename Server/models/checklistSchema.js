const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    }
})

const checklistSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  checklist: [taskSchema]
});

const CheckList = mongoose.model('CheckList', checklistSchema);
module.exports = CheckList;