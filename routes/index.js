var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = require('../config');

var defaultApp = firebase.initializeApp(config.firebaseConfig);

var firebase = require('firebase');
var user = firebase.auth().currentUser;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.pug', {
    title: 'WELCOME TO THE ANTI-OUTSIDE INSIDE APP',
    booksURL: '/books',
    watchURL: '/watch',
	listenURL: '/listen',
    signupURL: '/signup',
    signinURL: '/signin',
    signoutURL: '/signout'}); //a(href=signoutURL) Sign Out!
});


router.get('/signout', function(req, res, next) {
	firebase.auth().signOut().then(function() {
	  console.log('Signed Out');
	  res.render('index', {
	    title: 'Couch Surf',
	    booksURL: '/books',
	    watchURL: '/watch',
		  listenURL: '/listen',
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
