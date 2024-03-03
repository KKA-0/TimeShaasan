const todoController = require('./../controllers/todoController')
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

module.exports = router