const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const db = require('./db/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

db();

const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;