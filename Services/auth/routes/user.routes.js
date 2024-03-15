const express = require('express')
const router = express.Router()
const usersController = require('./../controllers/user.controller')
const authController = require('./../controllers/auth.controller')

router.get('/users', authController.checkToken, usersController.allUsers)
router.post('/user', usersController.addUser)


module.exports = router