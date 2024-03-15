const focus_Session_Schema = require('./../models/focus.schema')

const { Kafka } = require('kafkajs')

// Kafka configuration
const kafka = new Kafka({
    clientId: 'focusService',
    brokers: ['kafka:9092'],
})
const ConsumerConfig = async () => {
    const consumer = kafka.consumer({ groupId: 'focusGroup' })
    await consumer.connect()
    await consumer.subscribe({ topics: ['newUser'] })
    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            createConsumerPomodoro(message.value.toString())
            console.log({
                user_id: message.value.toString()
            })
        },
    })
}
ConsumerConfig()
const createConsumerPomodoro = async (user_id) => {
    try {
        await focus_Session_Schema.create({
            user_id: user_id
        });
        console.log('Focus created successfully.');
    } catch (error) {
        console.error('Error creating FocusSession:', error);
    }
}


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
        await focus_Session_Schema.findOneAndUpdate({ user_id: req.params.id }, {
            sessions: req.body.sessions,
            sessions_limit: req.body.sessions_limit,
            start_Timestamp: req.body.start_Timestamp,
            remaining_Time: req.body.remaining_Time,
            ToggleTimer: req.body.ToggleTimer
        });        
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