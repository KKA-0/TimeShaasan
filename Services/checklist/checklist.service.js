const express = require('express')
const app = express()
const PORT = 5002
const bodyParser = require('body-parser')
const routes = require('./routes/checklist.routes')
const mongoose = require('mongoose')

// ENV variables
require('dotenv').config({path: ".env"})

// CORS
var cors = require('cors')
app.use(cors());

// BodyParser for requests
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Mongo configuration
mongoose.connect(process.env.DB_URI)
  .then(() => console.log("🧬 Connected to Database!"))
  .catch(() => console.log("Something Went Wrong to Database Connnection!"))


// Routes
app.use('/api/v1/checklist', routes)

app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})