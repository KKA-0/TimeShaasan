const mongoose = require('mongoose');

const focus_Session = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    sessions: {
        type: Number,
        required: true,
        default: 3
    },
    sessions_limit: {
        type: Number,
        required: true,
        default: 2400
    },
    start_Timestamp: {
        type: Number,
        required: true,
        default: 0
    },
});

focus_Session_Schema = mongoose.model('focus_Session', focus_Session);
module.exports = focus_Session_Schema;