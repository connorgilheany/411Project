var express = require('express');
var network = require('../network');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('books.pug', { title: 'Couch Surf', results: [], resultsLength: "" });
});


// Returns promise with list of book titles if request is successful
let searchBooks = (queryString) => {
  return network.call('https://www.googleapis.com/books/v1/volumes?q=' + queryString, parser, queryString);
}

let parser = (resultJSON) => {
  let bookTitles = [];
  resultJSON.items.slice(0, 10).forEach(item => {
    bookTitles.push(item.volumeInfo.title);
  })
  return bookTitles;
}

router.post('/', function(req, res, next) {
    var input = req.body.query;
    console.log(input);
    searchBooks(input).then((books) => {
    res.render('books.pug',
      {
        title: 'COUCH SURF',
        results: books,
        resultsLength: books.length + ' results found'
      });
  });
});


module.exports = router;
