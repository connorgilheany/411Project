var request = require('request');

//Returns a promise with the result of the cache lookup / network call
let call = (url, parser) => {
  return new Promise((resolve, reject) => {
    //Check if it's in the cache (URL key), if so resolve with the data from cache
    //Else:
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let jsonBody = JSON.parse(body);
        let parsed = parser(jsonBody);
        //Add it to the cache with the URL as the key
        resolve(parsed);
      } else {
        reject(Error("Error processing request to URL: "+parser));
      }
    });
  });
}

module.exports = call