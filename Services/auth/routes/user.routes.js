const express = require('express')
const router = express.Router()
const usersController = require('./../controllers/user.controller')
const authController = require('./../controllers/auth.controller')

router.get('/', authController.checkToken, usersController.allUsers)
router.post('/', usersController.addUser)


module.exports = router