var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let studentRouter= require('./routes/student.routes');
const authRouter=require('./routes/auth.routes');
const middleware= require('./middleware/jwt.middleware');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/stud', middleware.checkToken,studentRouter);
app.use('/auth', authRouter);
app.use('/users',middleware.checkToken, usersRouter);

module.exports = app;
