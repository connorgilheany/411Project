var express = require('express');
var network = require('../network');
var router = express.Router();
var firebase = require('firebase');

var firebaseConfig = require('../config');

var firebaseRef = firebaseConfig.databaseURL;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});


//Create new user
router.post('/', function(req, res, next) {
	var newEmail = req.body.email;
	var newPass = req.body.password;
	console.log(newEmail);
	console.log(newPass);
	firebase.auth().createUserWithEmailAndPassword(newEmail, newPass).then(function(user) {
		res.render('index', {success: 'Signed up successfully!'});
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode);
		res.render('signup', {success: 'Failed to Sign Up!'});
	});

	
});

//Perform authentication
// app.post('/login', function(req, res){
// 	var userEmail = req.headers['user-email'];
// 	var userPassword = req.headers['user-pass'];
// 	userService.authenticate(userEmail, userPassword,
// 		function(error, authData) {
// 			if (error) {
// 				return res.status(401).send('Unauthorized');
// 			} else {
// 				return res.status(200).send(authData);
// 		}
// 	});
// });



module.exports = router;
