var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
var watchRouter = require('./routes/watch');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/watch', watchRouter);


var userService = require('./user_service');

//Create new user
app.post('/user', function(req, res) {
	var newUserEmail = req.headers['user-email'];
	var newUserPass = req.headers['user-pass'];
	userService.addUser(newUserEmail, newUserPass, 
		function(error, uid) {
			if (error) {
				return res.status(500).send('Error when creating user');
			} else {			
				return res.status(201).send({uid : uid});
		}
	});
});

//Perform authentication
app.post('/login', function(req, res){
	var userEmail = req.headers['user-email'];
	var userPassword = req.headers['user-pass'];
	userService.authenticate(userEmail, userPassword,
		function(error, authData) {
			if (error) {
				return res.status(401).send('Unauthorized');
			} else {
				return res.status(200).send(authData);
		}
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
