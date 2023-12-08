const express = require('express')
const router = express.Router()
const usersController = require('./../controllers/usersController')

router.get('/users', usersController.allUsers)
router.post('/user', usersController.addUser)


module.exports = router