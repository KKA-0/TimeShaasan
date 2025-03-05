const userSchema = require('./../models/user.schema')
const { incrementUserCountMetric } = require('../metrics/metrics');
const logger = require('../logs/logs');
const jwt = require('jsonwebtoken');
const { Kafka } = require('kafkajs')
const bcrypt = require('bcryptjs');

const signToken = (data) => {
    return jwt.sign({id: data.id, email: data.email, username: data.username},
        process.env.SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );    
}

// Kafka configuration
const kafka = new Kafka({
    clientId: 'authService',
    brokers: [process.env.KAFKA_BROKER]
})

const producerConfig = async (data) => {
    const producer = kafka.producer()
    await producer.connect()

    jsonObject = {
        'id': data.user_id,
        'email': data.email,
        'username': data.username
    }
    StingData = JSON.stringify(jsonObject);

    await producer.send({
      topic: 'newUser',
      messages: [
        { 
            value: StingData
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
                producerConfig({ user_id: newUser._id, email: newUser.email, username: newUser.username});
                const token = signToken(newUser)
                if (newUser.statusCode === 201) {
                    logger.info('User created successfully with status 201');
                    incrementUserCountMetric();
                }
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


exports.signupUser = async (req, res) => {
    console.log("Signup process initiated...");

    try {
        const { email, password, username } = req.body;
        let user = await userSchema.findOne({ email });
        console.log(user)
        if (!user) {
            // Hash password before saving
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await userSchema.create({ ...req.body,username: email, password: hashedPassword });
            producerConfig({ user_id: newUser._id, email: newUser.email, username: newUser.email});
            console.log(newUser)
            if (newUser.statusCode === 201) {
                logger.info('User created successfully with status 201');
                incrementUserCountMetric();
            }
            // Generate token
            const token = await createToken(newUser);
            return res.status(201).json({
                user: newUser,
                Token: token
            });
        }

        // User exists, check password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate token
        const token = await createToken(user);

        return res.status(200).json({
            user,
            token
        });

    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(500).json({ message: 'Server error' });
    }
};