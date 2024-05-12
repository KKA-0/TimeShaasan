const focusController = require('./../controllers/focus.controller')
const authController = require('./../controllers/authController')
const express = require('express')
const router = express.Router()

router.post('/focus', focusController.AddFocusSession)
router
    .route('/focus/:id')
    .get(authController.verifyRequest, focusController.getFocusedSession)
    .patch(authController.verifyRequest, focusController.UpdateFocusSession)

module.exports = router