const express = require('express')
const app = express()
const PORT = 5001
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const { countHttpRequest, getMetrics } = require('./metrics/metrics');
const logger = require('./logs/logs');
// ENV variables
require('dotenv').config({path: ".env"})

// CORS
var cors = require('cors')
app.use(cors());

// Mongo configuration
mongoose.connect(process.env.DB_URI)
  .then(() => console.log("🧬 Connected to Database!"))
  .catch(() => console.log("Something Went Wrong to Database Connnection!"))


// BodyParser for requests
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Log request IP address and count HTTP requests
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logger.info(`Request from IP: ${ip}`);
  countHttpRequest(req, res);
  next();
});

// Routes
app.get('/metrics', getMetrics);
app.use('/working', (req, res) => { res.send("working") } )
app.use('/api/v1', authRoutes)
app.use('/api/v1/user', userRoutes)

app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})