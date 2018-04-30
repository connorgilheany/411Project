var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = require('../config');

var defaultApp = firebase.initializeApp(config.firebaseConfig);

var user = firebase.auth().currentUser;


/* GET home page. */
router.get('/', function(req, res, next) {
    firebase.auth().onAuthStateChanged( user => {
    if (user) { 
        // if there is a user logged on, render them home page
      this.userId = user.uid;
      res.render('index', {
            currentUser: "true", 
            user: user.email, 
            success: 'Welcome!', 
            booksURL: '/books',
            watchURL: '/watch',
            cookURL: '/food',
            signoutURL: '/signout',
            currentUser: 'true'});
    }
    else{
        // else user is not logged on so give them signin page
        res.render('index', {showLogin: "true"});
    }
  }); 
});

router.post('/signup', function(req, res, next) {
    var newEmail = req.body.email;
    var newPass = req.body.password;
    firebase.auth().createUserWithEmailAndPassword(newEmail, newPass).then(function(user) {
        firebase.database().ref('cache/').child(user.uid).set({
            "_email" : newEmail});
        res.render('index', {
            success: 'Signed up successfully!', 
            booksURL: '/books',
            watchURL: '/watch',
            cookURL: '/food',
            user: user.email,
            currentUser: 'true'});
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        res.render('index', {success: 'Failed to Sign Up!'});
    });
});




// Perform authentication
router.post('/signin', function(req, res){
    var userEmail = req.body.email;
    var userPass = req.body.password;
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(user) {
        // success log in
        console.log(user.uid);
        res.render('index', {
            success: 'Welcome!', 
            user: user.email,
            booksURL: '/books',
            watchURL: '/watch',
            cookURL: '/food',
            signoutURL: '/signout',
            currentUser: 'true'});
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        res.render('index', {success: 'Failed to Sign In!', showLogin: "true"});

        // ...
    });
});



router.get('/signout', function(req, res, next) {
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
      res.render('index', { 
        showLogin: 'true'});

      // debug for if user signs out
      firebase.auth().onAuthStateChanged( user => {
        if (user) { 
          this.userId = user.uid;
          console.log(user.uid); 
        }
      });
    }, function(error) {
      console.error('Sign Out Error', error);
    });
});



module.exports = router;
