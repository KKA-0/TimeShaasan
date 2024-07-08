const express = require('express')
const router = express.Router()
const settingController = require('../controllers/setting.controller')

router.post('/settings/:user_id', settingController.addSettings)
router.get('/settings/:user_id', settingController.getSettings)

module.exports = router