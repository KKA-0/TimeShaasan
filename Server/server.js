require('dotenv').config({path: ".env"})
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const app = express();
const http = require('http').createServer(app);
const socket = require('./socket.io')

const { createClient } = require('redis');

const client = createClient({
  password: `${process.env.PASSWORD_REDIS}`,
  socket: {
      host: `${process.env.HOSTNAME_REDIS}`,
      port: process.env.PORT_REDIS,
      // connectTimeout: 50000,
      // reconnectStrategy: times => {
      //     const delay = Math.min(times * 50, 2000);
      //     return delay;
      // }
  }
});
client.connect()
module.exports = client;


console.log(process.env.STATUS)

var cors = require('cors')
app.use(cors());

const userRoutes = require('./routes/userRoutes')
const todoRoutes = require('./routes/todoRoutes')
const authRoutes = require('./routes/authRoutes')
const checklistRoutes = require('./routes/checklistRoutes')
const focusRoutes = require('./routes/focusRoutes')
const settingRoutes = require('./routes/settingRoutes')

app.use(morgan('dev'));

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const DB_URI = process.env.DB_URI

mongoose.connect(DB_URI)
  .then(() => console.log("🧬 Connected to Database!"))
  .catch(() => console.log("Something Went Wrong to Database Connnection!"))


app.get('/', (req, res) => {
  res.send('Hello Friend, How you get here?')
})

//Socket.io Connection
socket(http)

app.use('/api', userRoutes);
app.use('/api', todoRoutes);
app.use('/api', authRoutes);
app.use('/api', checklistRoutes);
app.use('/api', focusRoutes);
app.use('/api', settingRoutes);

http.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});