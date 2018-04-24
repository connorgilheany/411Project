
var Firebase = require('firebase');

var firebaseConfig = require('./config');

var firebaseRef = "cs411-2b882.firebaseapp.com"

function addUser(email, password, callback) {
	firebaseRef.createUser({
		email : email,
		password : password
	}, function(error, userData) {
		callback(error, userData.uid);
	});
}


function authenticate(email, password, callback) {
	firebaseRef.authWithPassword({
		email : email, 
		password : password
	}, function(error, authData) {
		callback(error, authData);
	});
}

module.exports = {
	addUser : addUser,
	authenticate : authenticate
}