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
    const { source, destination, sourceId, index } = req.body
    try {
        console.log(source, sourceId)
        const task = await todoSchema.findOne(
            { user_id: req.params.id },
            {
                [source]: { $elemMatch: { task_id: sourceId } }
            }
        );
        movedTask = {
            index: index,
            title: task[source][0].title,
            task_id: task[source][0].task_id
        }
        console.log(movedTask);
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