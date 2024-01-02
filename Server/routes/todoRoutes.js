const todoController = require('./../controllers/todoController')
const express = require('express')
const router = express.Router()

router.get('/todo', todoController.allTodo)
router.post('/todo', todoController.addTodo)

router
    .route('/todo/:id')
    .patch(todoController.addTask)
    .put(todoController.rmTask)

module.exports = router