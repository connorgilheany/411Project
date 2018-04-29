var express = require('express');
var network = require('../network');
var router = express.Router();
var firebase = require('firebase');

var firebaseConfig = require('../config');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});


//Create new user
router.post('/', function(req, res, next) {
    var newEmail = req.body.email;
    var newPass = req.body.password;
    firebase.auth().createUserWithEmailAndPassword(newEmail, newPass).then(function(user) {
        firebase.database().ref('cache/').child(user.uid).set({
            "_email" : newEmail});
        firebase.database().ref('cache/').child(user.uid).child('books').set({});
        firebase.database().ref('cache/').child(user.uid).child('videos').set({});
        res.render('index', {
            success: 'Signed up successfully!', booksURL: '/books',
            watchURL: '/watch',
            signupURL: '/signup', 
            signinURL: '/signin'});
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        res.render('signup', {success: 'Failed to Sign Up! ' + errorCode});
    });

    
});



module.exports = router;
