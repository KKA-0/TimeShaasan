const todoSchema = require('../models/todo.schema')
const { Kafka } = require('kafkajs')

// Kafka configuration
const kafka = new Kafka({
    clientId: 'todoService',
    brokers: ['kafka:9092',],
})

const ConsumerConfig = async () => {
    const consumer = kafka.consumer({ groupId: 'todoGroup' })
    await consumer.connect()
    await consumer.subscribe({ topics: ['newUser'] })
    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            heartbeat()
            newConsumerTodo(message.value.toString())
            console.log({
                user_id: message.value.toString()
            })
        },
    })
}
ConsumerConfig()
const newConsumerTodo = async (user_id) => {
    try {
        await todoSchema.create({
            user_id: user_id
        })
        console.log('TODO created successfully.');
    } catch (error) {
        console.error('Error creating Todo:', error);
    }
}


exports.allTodo = async (req, res) => {
    try {
        const todo = await todoSchema.find()
        res
            .status(200)
            .json({
                todo
            })
    }catch(err) {
        res
            .status(400)
            .json({
                Error: err
            })
    }
}

exports.addTodo = async (req, res) => {
    try {
        const todo = await todoSchema.create(req.body)
        res
            .status(201)
            .json({
                todo
            })
    }catch(err) {
        res
            .status(400)
            .json({
                Error: err
            })
    }
}

exports.getTodos = async (req, res) => {
    try {
        const todos = await todoSchema.findOne(
            { user_id: req.params.id }
        )
        res
            .status(200)
            .json({
                todos
            })
    }catch(err) {
        res
            .status(400)
            .json({
                Error: err
            })
    }
}

exports.rmTask = async (req, res) => {
    try {
            const { colm, task_id } = req.body
            //console.log(colm, task_id)
            const updatedTask = await todoSchema.findOneAndUpdate(
                { user_id: req.params.id },
                { $pull: { [colm]: { task_id } } },
                { new: true } 
            );     
            res
                .status(200)
                .json({
                    // updatedTask
                    status: "success"
                })
    }catch(err) {
        res
            .status(400)
            .json({
                Error: err
            })
    }
}

exports.addTask = async (req, res) => {
    try {
        const newTask = await todoSchema.findOneAndUpdate(
            { user_id: req.params.id }, // find user from param id
            { $push: { todo: {"index": req.body.index , "title": req.body.title, task_id: req.body.task_id} } }, // push new task in todo 
            { new: true }
        ) 
            res
            .status(201)
            .json({
                // newTask
                status: "success"
            })
    }catch(err) {
        res
            .status(400)
            .json({
                Error: err
            })
    }
}

exports.moveTask = async (req, res) => {
    const { source, destination, sourceId } = req.body
    try {
        // console.log(source,destination, sourceId)
        const task = await todoSchema.findOne(
            { user_id: req.params.id },
            {
                [source]: { $elemMatch: { task_id: sourceId } }
            }
        );
        movedTask = {
            title: task[source][0].title,
            task_id: task[source][0].task_id
        }
        // console.log(movedTask);
        await todoSchema.findOneAndUpdate(
            { user_id: req.params.id },
            {
                $push: { [destination]: movedTask }
            }
        )
        await todoSchema.findOneAndUpdate(
            { user_id: req.params.id },
            { $pull: { [source]: { task_id: sourceId} } },
            { new: true }
        )
        res.status(200).json(movedTask);
    }catch(err) {
        res
            .status(400)
            .json({
                Error: err
            })
    }
}

exports.editTask = async (req, res) => {
    try {
        const { colm, task_id, title } = req.body
        const newTitle = await todoSchema.findOneAndUpdate(
            { user_id: req.params.id, [colm]: {$elemMatch: { task_id } } },
            { 
                $set: { [`${colm}.$.title`]: title }
            },
            { 
                new: true 
            }
        )
            res
                .status(200)
                .json({
                    // newTitle
                    status: "success"
                })
    }catch(err) {
        res
            .status(400)
            .json({
                Error: err
            })
    }
}
