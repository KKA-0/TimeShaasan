const express = require('express')
const router = express.Router()
const settingController = require('./../controllers/settingController')

router.post('/settings', settingController.addSettings)
router.get('/settings', settingController.getSettings)

module.exports = router