const focus_Session_Schema = require('./../models/focusSession.schema')

exports.AddFocusSession = async (req, res) => {
    try{
        const focus = await focus_Session_Schema.create({ user_id: req.body.user_id })
        res.status(200).json({
            success: true,
        })
    }catch(err){
        res.status(400).json({
            success: false,
            error: err
        })
    }
}

exports.UpdateFocusSession = async (req, res) => {
    try{
        await focus_Session_Schema.findByIdAndUpdate( req.params.id, {
            sessions: req.body.sessions,
            sessions_limit: req.body.sessions_limit,
            start_Timestamp: req.body.start_Timestamp,
            remainingTime: req.body.remainingTime
        })
        res.status(200).json({
            success: true,
        })
    }catch(err){
        res.status(400).json({
            success: false,
            error: err
        })
    }
}

exports.getFocusedSession = async (req, res) => {
    try{
        const focus = await focus_Session_Schema.findOne( { user_id: req.params.id })
        res.status(200).json({
            focus
        })
    }catch(err){
        res.status(400).json({
            success: false,
            error: err
        })
    }
}