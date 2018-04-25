var express = require('express');
var network = require('../network');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});


var userService = require('../user_service');

//Create new user
router.post('/', function(req, res, next) {
	var newUserEmail = req.body.email;
	var newUserPass = req.body.password;
	console.log(newUserEmail);
	console.log(newUserPass);
	userService.addUser(newUserEmail, newUserPass, 
		function(error, uid) {
			if (error) {
				return res.status(500).send('Error when creating user');
			} else {			
				return res.status(201).send({uid : uid});
		}
	});
	res.render('index');
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
