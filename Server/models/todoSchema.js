const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    // index: {
    //     type: Number,
    //     default: 0
    // },
    task_id: {
      type: String,
      required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, { _id: false });

const todoSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  todo: [taskSchema],
  inProgress: [taskSchema],
  done: [taskSchema]

});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;