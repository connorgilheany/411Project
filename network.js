var request = require('request');

var firebase = require('firebase');
const firebaseConfig = require('./config');

var defaultApp = firebase.initializeApp(firebaseConfig);
console.log(defaultApp.name);  // "[DEFAULT]"

var defaultDatabase = defaultApp.database();
var user = firebase.auth().currentUser;



function writeBookData(url, parsedResult, queryString) {
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
    firebase.auth().onAuthStateChanged( user => {
    if (user) { 
      this.userId = user.uid;
      var query = firebase.database().ref('cache/').child(user.uid);
      query.once("value") 
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            console.log("this key" + key);
            if (key == queryString){
              console.log("Got cache");
              resolve(childSnapshot.child("result").val());
            }
            else{
              request(url, (error, response, body) => {
              if (!error && response.statusCode == 200) {
                let jsonBody = JSON.parse(body);
                let parsed = parser(jsonBody);
                //Add it to the cache with the URL as the key
                resolve(parsed);
                writeBookData(url, parsed, queryString);
              } else {
                reject(Error("Error processing request to URL: "+parser));
              }
            });

            }
          })
        });
      
      }
    });


  });
}

module.exports = {
  call : call,
  defaultApp : defaultApp,
  defaultDatabase : defaultDatabase
}
