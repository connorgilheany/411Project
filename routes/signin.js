var express = require('express');
var network = require('../network');
var router = express.Router();
var firebase = require('firebase');

var firebaseConfig = require('../config');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signin.pug');
});


// Perform authentication
router.post('/', function(req, res){
	var userEmail = req.body.email;
	var userPass = req.body.password;
	firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(user) {
		// success log in
		console.log(user.uid);
		res.render('index.pug', {
			success: 'Signed in successfully!', 
			user: user.email,
			booksURL: '/books',
		    watchURL: '/watch',
			listenURL: 'listen',
		    signupURL: '/signup', 
		    signinURL: '/signin'});
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		res.render('signin.pug', {success: 'Failed to Sign In!'});

		// ...
	});
	

});



module.exports = router;
