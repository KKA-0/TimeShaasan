const checklistSchema = require('../models/checklist.schema') 
const { Kafka } = require('kafkajs')

// Kafka configuration
const kafka = new Kafka({
    clientId: 'checklistService',
    brokers: ['kafka:9092',],
})

const ConsumerConfig = async () => {
    const consumer = kafka.consumer({ groupId: 'my-group' })
    await consumer.connect()
    await consumer.subscribe({ topics: ['newUser'] })
    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            createCheckList(message.value.toString())
            console.log({
                user_id: message.value.toString()
            })
        },
    })
}
ConsumerConfig()
const createCheckList = async (user_id) => {
    try {
        await checklistSchema.create({
            user_id: user_id
        });
        console.log('Checklist created successfully.');
    } catch (error) {
        console.error('Error creating checklist:', error);
    }
}

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

exports.RemoveChecklist = async (req, res) => { 
    try{
        const removed = await checklistSchema.findOneAndUpdate(
            { user_id: req.params.id },
            { $pull: { checklist: { task_id: req.body.task_id } } },
            { new: true }
        )
        res.status(200).json({
            removed
        })
    }catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
 }

 exports.UpdateEditCheckList = async (req, res) => {
    try {
        const checklist = await checklistSchema.findOneAndUpdate(
            { user_id: req.params.id, "checklist.task_id": req.body.task_id },
            { $set: { "checklist.$.title": req.body.title } },
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