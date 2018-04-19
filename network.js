var request = require('request');
const connection =require('./db');


//Returns a promise with the result of the cache lookup / network call
let call = (url, parser) => {
  return new Promise((resolve, reject) => {
    //Check if it's in the cache (URL key), if so resolve with the data from cache
    connection((db) => {
      let cachedItem = db.collection('cached').findOne({"url": url});
      console.log(cachedItem);
        if(cachedItem) {
          console.log(cachedItem.result);
          resolve(cachedItem.result);
        }
      });
    // if query in database
    // return query content in db
    // else
    // hit api and store the content
    //Else:
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let jsonBody = JSON.parse(body);
        let parsed = parser(jsonBody);
        //Add it to the cache with the URL as the key
        resolve(parsed);
        connection((db) => {
        db.collection('cached')
            .insert({"url": url, "result": parsed})
    });
      } else {
        reject(Error("Error processing request to URL: "+parser));
      }
    });
  });
}

module.exports = call