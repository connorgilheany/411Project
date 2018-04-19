var express = require('express');
var network = require('../network');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('books', { title: 'Couch Surf', results: [], resultsLength: "" });
});


// Returns promise with list of book titles if request is successful
let searchBooks = (queryString) => {
  return network('https://www.googleapis.com/books/v1/volumes?q=' + queryString, parser);
}

let parser = (resultJSON) => {
  let bookTitles = [];
  console.log("Parsing "+resultJSON);
  resultJSON.items.slice(0,10).forEach(item => {
    bookTitles.push(item.volumeInfo.title);
  })
  return bookTitles;
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
