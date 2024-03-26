const express = require('express')
const router = express.Router()
const authController = require('./../controllers/auth.controller')

router.post('/token', authController.createToken)
router.get('/token', authController.checkToken)

module.exports = router