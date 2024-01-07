const focusController = require('./../controllers/focus.controller')
const express = require('express')
const router = express.Router()

router.post('/focus', focusController.AddFocusSession)
router
    .route('/focus/:id')
    .patch(focusController.UpdateFocusSession)

module.exports = router