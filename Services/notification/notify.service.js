const express = require('express')
const app = express()
const PORT = 5005
const pug = require('pug');
const { Kafka } = require('kafkajs')
const nodemailer = require("nodemailer");

// ENV variables
require('dotenv').config({path: ".env"})

// Kafka configuration
const kafka = new Kafka({
    clientId: 'notifyService',
    brokers: ['kafka:9092',],
})

const ConsumerConfig = async () => {
    const consumer = kafka.consumer({ groupId: 'notifyGroup' })
    await consumer.connect()
    await consumer.subscribe({ topics: ['newUser'] })
    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            createNotify(message.value)
        },
    })
}
ConsumerConfig()

const transporter = nodemailer.createTransport({
    host: process.env.HOSTNAME,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

const createNotify = async (data) => {
    try {
        const userData = JSON.parse(data)
        const username = userData.username
        const html = pug.renderFile(`${__dirname}/Views/newUser.pug`, {
            username
        });
        const info = await transporter.sendMail({
            from: `${process.env.USER_Name} <${process.env.EMAIL}>`, // sender address
            to: userData.email, // list of receivers
            subject: "You are now successfully registered | TimeShaasan", // Subject line
            html // pug template body
          });
        
        console.log("Message sent: %s", info.messageId);
        console.log('Email created successfully.');
    } catch (error) {
        console.error('Error creating Email:', error);
    }
}

// const newUser = async (newUserEmail) => {
//     const info = await transporter.sendMail({
//         from: `${process.env.USER} <${process.env.EMAIL}>`, // sender address
//         to: newUserEmail, // list of receivers
//         subject: "Congrats for being on Time ✔", // Subject line
//         text: "Welcome to TimeShaasan", // plain text body
//         html: "<b>Welcome to TimeShaasan</b>", // html body
//       });
    
//       console.log("Message sent: %s", info.messageId);
// }

// For Testing Email
// createNotify("jadonharsh109@gmail.com")

// CORS
var cors = require('cors')
app.use(cors());

app.use('/working', (req, res) => { res.send("working") } )

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})