var express = require('express');
var router = express.Router();

var request = require('request');

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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Couch Surf', results: [] });
});

router.post('/search', function(req, res, next) {
	var input = req.body.query;
	searchBooks(input).then((books) => {
    res.render('index',
      {
        booksURL: '/books',
        watchURL: '/watch',
        title: 'COUCH SURF',
        results: books,
        resultsLength: books.length + ' results found'
      });
  });
});

module.exports = router;
