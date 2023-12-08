const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const app = express();
var cors = require('cors')
app.use(cors());

const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes')

app.use(morgan('dev'));

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())



mongoose.connect('mongodb://192.168.69.69:27017/testing')
  .then(() => console.log("🧬 Connected to Database!"))
  .catch(() => console.log("Something Went Wrong to Database Connnection!"))

app.get('/', (req, res) => {
  res.send('Hello Friend, How you get here?')
})

app.use('/api', userRoutes);
app.use('/api', todoRoutes);

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});