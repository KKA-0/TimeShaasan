const todoController = require('./../controllers/todo.controller')
const express = require('express')
const router = express.Router()

router.get('/todo', todoController.allTodo)
router.post('/todo', todoController.addTodo)

router
    .route('/todo/:id')
    .get(todoController.getTodos)
    .patch(todoController.addTask)
    .put(todoController.rmTask)
router
    .route('/todo/move/:id')
        .patch(todoController.moveTask)
router
    .route('/todo/edit/:id')
        .patch(todoController.editTask)

module.exports = router