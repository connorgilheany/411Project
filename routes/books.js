var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('books', { title: 'Couch Surf', results: [], resultsLength: "" });
});


// Returns promise with list of book titles if request is successful
let searchBooks = (queryString) => {
  return new Promise((resolve, reject) => {
    request('https://www.googleapis.com/books/v1/volumes?q=' + queryString, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let jsonBody = JSON.parse(body);
        let bookTitles = [];

        // grab first 10 results
        jsonBody.items.slice(0,10).forEach(item => {
          bookTitles.push(item.volumeInfo.title);
        });

        resolve(bookTitles);
      } else {
        reject(Error("No Book Returned Yet"));
      }
    });
  });
}

router.post('/', function(req, res, next) {
    var input = req.body.query;
    searchBooks(input).then((books) => {
    res.render('books',
      {
        title: 'COUCH SURF',
        results: books,
        resultsLength: books.length + ' results found'
      });
  });
});


module.exports = router;
