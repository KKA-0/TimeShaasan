const express = require('express')
const router = express.Router()
const usersController = require('./../controllers/usersController')
const authController = require('./../controllers/authController')

router.get('/users', authController.checkToken, usersController.allUsers)
router.post('/user', usersController.addUser)


module.exports = router