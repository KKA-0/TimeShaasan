const todoController = require('./../controllers/todoController')
const authController = require('./../controllers/authController')
const express = require('express')
const router = express.Router()

router.get('/todo', todoController.allTodo)
router.post('/todo', todoController.addTodo)

router
    .route('/todo/:id')
    .get(authController.verifyRequest, todoController.getTodos)
    .patch(authController.verifyRequest, todoController.addTask)
    .put(authController.verifyRequest, todoController.rmTask)
router
    .route('/todo/move/:id')
        .patch(authController.verifyRequest, todoController.moveTask)
router
    .route('/todo/edit/:id')
        .patch(authController.verifyRequest, todoController.editTask)

module.exports = router