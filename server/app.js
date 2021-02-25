require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const hotelRoute = require('./routes/hotel');
const roomRoute = require('./routes/room');
const equipmentRoute = require('./routes/equipment');
const locationRoute = require('./routes/location');
const transactionRoute = require('./routes/transaction');

const app = express();
const corsOptions = {
  origin: process.env.REACT_APP_URL,
  optionsSuccessStatus: 200,
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/hotel', hotelRoute);
app.use('/api/room', roomRoute);
app.use('/api/equipment', equipmentRoute);
app.use('/api/location', locationRoute);
app.use('/api/transaction', transactionRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;