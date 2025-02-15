const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const db = require('./db/db');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db();

const userRoutes = require('./routes/user.routes');
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;