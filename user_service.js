
var firebase = require('firebase');

var firebaseConfig = require('./config');

var firebaseRef = firebaseConfig.databaseURL;

function addUser(email, password, callback) {
	console.log(email);
	console.log(password);
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	console.log(errorCode);
	// ...
	});
}


module.exports = {
	addUser : addUser,
}