const focusController = require('./../controllers/focus.controller')
const express = require('express')
const router = express.Router()

router.post('/focus', focusController.AddFocusSession)
router
    .route('/focus/:id')
    .get(focusController.getFocusedSession)
    .patch(focusController.UpdateFocusSession)

module.exports = router