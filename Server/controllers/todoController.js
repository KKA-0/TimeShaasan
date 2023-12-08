
const todoSchema = require('./../models/todoSchema')

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

exports.rmTask = async (req, res) => {
    try {
        if(req.body.Task === "todo"){
            const updatedTask = await todoSchema.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { todo: { _id: req.body.task_id } } },
                { new: true } // Return the modified document
            );     
            res
                .status(201)
                .json({
                    updatedTask
                })
        }else if(req.body.Task === "doing"){
            const updatedTask = await todoSchema.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { doing: { _id: req.body.task_id } } },
                { new: true } // Return the modified document
            ); 
            res
                .status(201)
                .json({
                    updatedTask
                })
        }else if(req.body.Task === "done") {
            const updatedTask = await todoSchema.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { done: { _id: req.body.task_id } } },
                { new: true } // Return the modified document
            ); 
            res
                .status(201)
                .json({
                    updatedTask
                })
        }
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
        if(req.body.Task === "todo"){
            const task = await todoSchema.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { todo: { "title": req.body.title } } },
                { new: true } // Return the modified document
              );
            res
                .status(201)
                .json({
                    task
                })
        }else if(req.body.Task === "doing") {
            const task = await todoSchema.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { doing: { "title": req.body.title } } },
                { new: true } // Return the modified document
              );
            res
                .status(201)
                .json({
                    task
                })
        }else if(req.body.Task === "done") {
            const task = await todoSchema.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { done: { "title": req.body.title } } },
                { new: true } // Return the modified document
              );
            res
                .status(201)
                .json({
                    task
                })
        }
    }catch(err) {
        res
            .status(400)
            .json({
                Error: err
            })
    }
}