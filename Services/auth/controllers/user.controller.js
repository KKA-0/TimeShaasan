const userSchema = require('./../models/user.schema')
// const focus_Session_Schema = require('./../models/focusSession.schema')
// const checklistSchema = require('./../models/checklistSchema')
// const todosSchema = require('./../models/user.schema')
const jwt = require('jsonwebtoken');
const { Kafka } = require('kafkajs')

const signToken = (data) => {
    return jwt.sign({id: data.id, email: data.email, username: data.username},
        process.env.SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );    
}

// Kafka configuration
const kafka = new Kafka({
    clientId: 'authService',
    brokers: ['kafka:9092',],
})

const producerConfig = async (data) => {
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
      topic: 'newUser',
      messages: [
        { 
            value: data.user_id.toString(), 
            headers: {
                'email': data.email,
                'username': data.username
            }
        },
      ],
    })
    
    await producer.disconnect()
}

exports.allUsers = async (req, res) => {
    const users = await userSchema.find();
    try {
        res.status(200).json({
            users
        })
    }catch(err){
        res.status(400).json({
            message: err
        })
    }
}
exports.addUser = async (req, res) => {
    try {
        const userExist = await userSchema.findOne({email: req.body.email})
        try{
            if (!userExist){
                const newUser = await userSchema.create(req.body);
                // Creating User Collections
                producerConfig({ user_id: newUser._id, email: newUser.email})
                // await checklistSchema.create({ user_id: newUser._id });
                // await focus_Session_Schema.create({ user_id: newUser._id })
                // await todosSchema.create({ user_id: newUser._id })
                const token = signToken(newUser)
                res.status(201).json({
                    user: newUser,
                    Token: token
                })

            }else{
                const Token = signToken(userExist)
                res.status(202).json({
                    user: userExist,
                    Token: Token
                })
            }
        }catch(err){
            res.status(500).json({status: 'Fail', Message: err})
        }
    }catch(err){
        res.status(500).json({status: 'Fail', Message: err})
    }
}
exports.getUser = async (req, res) => {
    const user = await userSchema.findById(req.body.id);
    try {
        res.status(200).json({
            user
        })
    }catch(err){
        res.status(400).json({
            message: err
        })
    }
}