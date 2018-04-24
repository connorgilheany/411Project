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

function writeBookData(url, parsedResult) {
  firebase.database().ref('books/').child('user/').set({ //insert specific uid
    "url": url,
    "result": parsedResult
  });
}

//Returns a promise with the result of the cache lookup / network call
let call = (url, parser) => {
  return new Promise((resolve, reject) => {
    //Check if it's in the cache (URL key), if so resolve with the data from cache
    
    // connection((db) => {
    //   let cachedItem = db.collection('cached').findOne({"url": url});
    //   console.log(cachedItem);
    //     if(cachedItem) {
    //       console.log(cachedItem.result);
    //       resolve(cachedItem.result);
    //     }
    //   });

    // if query in database
    // return query content in db
    // else
    // hit api and store the content
    //Else:
    //

    
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let jsonBody = JSON.parse(body);
        let parsed = parser(jsonBody);
        //Add it to the cache with the URL as the key
        resolve(parsed);
        writeBookData(url, parsed);


    //     connection((db) => {
    //     db.collection('cached')
    //         .insert({"url": url, "result": parsed})
    // });

      } else {
        reject(Error("Error processing request to URL: "+parser));
      }
    });


  });
}

module.exports = {
  call : call,
  defaultApp : defaultApp
}
