var express = require('express');
var network = require('../network');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('books', { title: 'Couch Surf', results: [], resultsLength: "", currentUser: 'true' });
});


// Returns promise with list of book titles if request is successful
let searchBooks = (queryString) => {
  return network.call('https://www.googleapis.com/books/v1/volumes?q=' + queryString, parser, queryString);
}


//Parser handles parsing the result into just # titles
let parser = (resultJSON) => {
  let bookTitles = [];
  resultJSON.items.slice(0, 10).forEach(item => {
    let bookResult = {};
    bookResult.title = item.volumeInfo.title;
    bookResult.previewLink = item.volumeInfo.previewLink;
    bookTitles.push(bookResult);
  })
  return bookTitles;
}

router.post('/', function(req, res, next) {
    var input = req.body.query;
    searchBooks(input).then((books) => {
    res.render('books',
      {
        results: books,
        resultsLength: 'Here are the top ' + books.length + ' results'
      });
  });
});


module.exports = router;
