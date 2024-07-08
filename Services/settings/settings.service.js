const express = require('express')
const app = express()
const PORT = 5006
const bodyParser = require('body-parser')
const { createClient } = require('redis');

// ENV variables
require('dotenv').config({path: ".env"})

const routes = require('./routes/focus.routes')

// CORS
var cors = require('cors')
app.use(cors());

// BodyParser for requests
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


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

// Routes
app.use('/working', (req, res) => { res.send("working") } )
app.use('/api/v1/', routes)

app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})