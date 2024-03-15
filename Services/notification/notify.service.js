const express = require('express')
const app = express()
const PORT = 5005
const { Kafka } = require('kafkajs')
const nodemailer = require("nodemailer");

// ENV variables
require('dotenv').config({path: ".env"})

// Kafka configuration
const kafka = new Kafka({
    clientId: 'notifyService',
    brokers: ['localhost:9092',],
})

const ConsumerConfig = async () => {
    const consumer = kafka.consumer({ groupId: 'notifyGroup' })
    await consumer.connect()
    await consumer.subscribe({ topics: ['newUser'] })
    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            createNotify(message.headers.email.toString())
            console.log({
                value: message.value.toString(),
                email: message.headers.email.toString()
            })
        },
    })
}
ConsumerConfig()

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

const createNotify = async (email) => {
    try {
        const info = await transporter.sendMail({
            from: `${process.env.USER} <${process.env.EMAIL}>`, // sender address
            to: email, // list of receivers
            subject: "Congrats for being on Time ✔", // Subject line
            text: "Welcome to TimeShaasan", // plain text body
            html: "<b>Welcome to TimeShaasan</b>", // html body
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

// CORS
var cors = require('cors')
app.use(cors());



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})