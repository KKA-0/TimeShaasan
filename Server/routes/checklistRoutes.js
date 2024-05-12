const checklistController = require('./../controllers/checklistController')
const authController = require('./../controllers/authController')
const express = require('express')
const router = express.Router()

router.post('/checklist', checklistController.createCheckList)

router
    .route('/checklist/:id')
    .get(authController.verifyRequest, checklistController.getCheckList)
    .post(authController.verifyRequest, checklistController.addCheckList)
    .patch(authController.verifyRequest, checklistController.UpdateStatusCheckList)
    .put(authController.verifyRequest, checklistController.RemoveChecklist)
router
    .route('/checklist/edit/:id')
    .patch(authController.verifyRequest, checklistController.UpdateEditCheckList)

module.exports = router