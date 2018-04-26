var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = require('../config');

var defaultApp = firebase.initializeApp(config.firebaseConfig);

var firebase = require('firebase');
var user = firebase.auth().currentUser;
var provider = new firebase.auth.GoogleAuthProvider();

function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}

function onSignIn(googleUser) {
  console.log('SIGNED IN');
  console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token);
      // Sign in with credential from the Google user.
      firebase.auth().signInWithCredential(credential).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    } else {
      console.log('User already signed-in Firebase.');
    }
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
	firebase.auth().onAuthStateChanged( user => {
    if (user) { 
    	// if there is a user logged on, render them home page
      this.userId = user.uid;
      res.render('index', {currentUser: "true", user: user.email, success: 'Welcome!'});
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
			user: user.email,
			currentUser: 'true'});
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode);
		res.render('signup', {success: 'Failed to Sign Up!'});
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
