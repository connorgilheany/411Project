var request = require('request');

var firebase = require('firebase');
const firebaseConfig = require('./config');

// var defaultApp = firebase.initializeApp(firebaseConfig);
// console.log(defaultApp.name);  // "[DEFAULT]"

// var defaultDatabase = defaultApp.database();
var user = firebase.auth().currentUser;



function writeBookData(url, parsedResult, queryString) {
  console.log("Writing data to cache: "+queryString);
  firebase.auth().onAuthStateChanged( user => {
    if (user) { 
      this.userId = user.uid;
      firebase.database().ref('cache/').child(user.uid).child(queryString).update({ //insert specific uid
        "url": url,
        "result": parsedResult
      }); 
    }
  });
}

function writeSpotifyData(url, parsedResult, queryString) {
    firebase.auth().onAuthStateChanged( user => {
        if (user) {
            this.userId = user.uid;
            firebase.database().ref('cache/').child(user.uid).child(queryString).update({ //insert specific uid
                "url": url,
                "result": parsedResult
            });
        }
    });
}

//Returns a promise with the result of the cache lookup / network call
let call = (url, parser, queryString) => {
  return new Promise((resolve, reject) => {
    //Check if it's in the cache (URL key), if so resolve with the data from cache
    
    // onAuthStateChanged to get current user uid as getting the uid is an async task 
    // that must be resolved before querying otherwise null pointer
    firebase.auth().onAuthStateChanged( user => {
      if (user) { 
        this.userId = user.uid;
        var query = firebase.database().ref('cache/').child(user.uid);
        query.once("value") 
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            if (key == queryString.toLowerCase()){ 
              console.log("Got data from cache: "+queryString)
              resolve(childSnapshot.child("result").val());
            } else {
              request(url, (error, response, body) => {
              if (!error && response.statusCode == 200) {
                let jsonBody = JSON.parse(body);
                let parsed = parser(jsonBody);
                //Add it to the cache with the URL as the key
                resolve(parsed);
                writeBookData(url, parsed, queryString.toLowerCase());
              } else {
                reject(Error("Error processing request to URL: "+parser));
              }
            });
            }
          });
        });
      }
    });
  });
}

let callNoCache = (url, parser) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let jsonBody = JSON.parse(body);
        let parsed = parser(jsonBody);
        resolve(parsed);
      } else {
        reject(Error("Error processing request to URL: "+parser));
      }
    });
  });
}

module.exports = {
  call : call,
  callNoCache: callNoCache
}
