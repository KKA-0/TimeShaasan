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
            { $push: { checklist: { "title": req.body.title} } },
            { new: true }
        )
        res.status(200).json({
            checklist
        })
    }catch(err){
        res.status(400).json({
            error: err
        })
    }
}