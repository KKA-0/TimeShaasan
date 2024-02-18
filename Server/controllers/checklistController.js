const checklistSchema = require('./../models/checklistSchema') 

exports.createCheckList = async ( req, res ) => {
    try{
     const checklist = await checklistSchema.create(req.body);
     res.status(201).json({
        checklist
     })
    }catch(err){
        res.status(400).json({
            error: err
        })
    }
}

exports.getCheckList = async ( req, res ) => {
    try{
     const checklists = await checklistSchema.find({user_id: req.params.id});
     res.status(200).json({
        checklists
     })
    }catch(err){
        res.status(400).json({
            error: err
        })
    }
}

exports.addCheckList = async ( req, res ) => {
    try{
        const checklist = await checklistSchema.findOneAndUpdate(
            { user_id: req.params.id },
            { $push: { checklist: { "title": req.body.title, task_id: req.body.task_id} } },
            { new: true }
        )
        const newChecklist_pos = checklist.checklist.length  - 1
        const newChecklist = checklist.checklist[newChecklist_pos]
        res.status(200).json({
            newChecklist
        })
    }catch(err){
        res.status(400).json({
            error: err
        })
    }
}

exports.UpdateStatusCheckList = async (req, res) => {
    try {
        const checklist = await checklistSchema.findOneAndUpdate(
            { user_id: req.params.id, "checklist.task_id": req.body.task_id },
            { $set: { "checklist.$.status": req.body.status } },
            { new: true }
        );
        if (!checklist) {
            return res.status(404).json({
                error: "Checklist item not found"
            });
        }
        res.status(200).json({
            message: "success"
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};