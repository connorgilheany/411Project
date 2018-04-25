var express = require('express');
var router = express.Router();
var firebase = require('firebase');
const firebaseConfig = require('../config');

var defaultApp = firebase.initializeApp(firebaseConfig);

var firebase = require('firebase');
var user = firebase.auth().currentUser;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Couch Surf', 
    booksURL: '/books',
    watchURL: '/watch',
    signupURL: '/signup', 
    signinURL: '/signin'});
});


router.get('/signout', function(req, res, next) {
	firebase.auth().signOut().then(function() {
	  console.log('Signed Out');
	  res.render('index', { 
	    title: 'Couch Surf', 
	    booksURL: '/books',
	    watchURL: '/watch',
	    signupURL: '/signup', 
	    signinURL: '/signin'});

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
