const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const app = express();

require('dotenv').config({path: ".env"})

console.log(process.env.STATUS)

var cors = require('cors')
app.use(cors());

const userRoutes = require('./routes/userRoutes')
const todoRoutes = require('./routes/todoRoutes')
const authRoutes = require('./routes/authRoutes')
const checklistRoutes = require('./routes/checklistRoutes')

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

app.use('/api', userRoutes);
app.use('/api', todoRoutes);
app.use('/api', authRoutes);
app.use('/api', checklistRoutes);

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});