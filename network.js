var request = require('request');
// const connection =require('./db');

var firebase = require('firebase');
// var admin = require('firebase-admin');
// var serviceAccount = require('path/to/serviceAccountKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: firebaseConfig.databaseURL
// });
const firebaseConfig = require('./config');

var defaultApp = firebase.initializeApp(firebaseConfig);
console.log(defaultApp.name);  // "[DEFAULT]"

var defaultDatabase = defaultApp.database();


function writeBookData(url, parsedResult, queryString) {
  firebase.database().ref('cache/').child("insertUID").child(queryString).update({ //insert specific uid
    "url": url,
    "result": parsedResult
  });
}

//Returns a promise with the result of the cache lookup / network call
let call = (url, parser, queryString) => {
  return new Promise((resolve, reject) => {
    //Check if it's in the cache (URL key), if so resolve with the data from cache
    
    var query = firebase.database().ref('cache/').child("insertUID");
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
    // ref.on("value", function(snapshot) {
    //   var storedQuery = snapshot.child("insertUID/").val();
    //   if (storedQuery != null) {
    //     for 
    //   }

    //    console.log(snapshot.val());
    // }, function (error) {
    //    console.log("Error: " + error.code);
    // });

    // ref.off("value");

    // if query in database
    // return query content in db
    // else
    // hit api and store the content
    //Else:
    //

    
    // request(url, (error, response, body) => {
    //   if (!error && response.statusCode == 200) {
    //     let jsonBody = JSON.parse(body);
    //     let parsed = parser(jsonBody);
    //     //Add it to the cache with the URL as the key
    //     resolve(parsed);
    //     writeBookData(url, parsed, queryString);


    //   } else {
    //     reject(Error("Error processing request to URL: "+parser));
    //   }
    // });


  });
}

module.exports = {
  call : call,
  defaultApp : defaultApp
}
