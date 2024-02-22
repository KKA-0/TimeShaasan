const checklistController = require('./../controllers/checklistController')
const express = require('express')
const router = express.Router()

router.post('/checklist', checklistController.createCheckList)

router
    .route('/checklist/:id')
    .get(checklistController.getCheckList)
    .post(checklistController.addCheckList)
    .patch(checklistController.UpdateStatusCheckList)
    .put(checklistController.RemoveChecklist)

module.exports = router