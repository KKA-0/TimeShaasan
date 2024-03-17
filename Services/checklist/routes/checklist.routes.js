const checklistController = require('./../controllers/checklist.controller')
const express = require('express')
const router = express.Router()

router.post('/', checklistController.createCheckList)

router
    .route('/:id')
    .get(checklistController.getCheckList)
    .post(checklistController.addCheckList)
    .patch(checklistController.UpdateStatusCheckList)
    .put(checklistController.RemoveChecklist)
router
    .route('/edit/:id')
    .patch(checklistController.UpdateEditCheckList)

module.exports = router