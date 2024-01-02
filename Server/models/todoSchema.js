const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    pos: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
})

const todoSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  todo: [taskSchema],
  doing: [taskSchema],
  done: [taskSchema]

});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;