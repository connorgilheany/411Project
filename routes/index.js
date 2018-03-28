var express = require('express');
var router = express.Router();

var request = require('request');
var url = 'https://www.googleapis.com/books/v1/volumes?q=hacker+terms';
var bookTitle;

let searchBooks = (queryString) => {
  return new Promise((resolve, reject) => {
    request('https://www.googleapis.com/books/v1/volumes?q=' + queryString, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        ja = JSON.parse(body);
        bookTitle = ja.items[0].volumeInfo.title; // "Food"

        jj = ja.totalItems;
        console.log(jj); // gives undefined
        console.log(bookTitle);
        resolve(bookTitle);
      } else {
        reject(Error("No Book Returned Yet"));
      }
    });
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
/*  res.render('index', 
    { title: 'Couch Surf',
      booksURL: '/books',
      watchURL: '/watch'  }); */
  res.render('index', { title: 'Couch Surf' });
});

router.post('/search', function(req, res, next) {
	
	// req.checkBody('search-books', 'Must be something in search box').notEmpty();
	var input = req.body.title; // queryString = ''
	searchBooks(input).then((books) => {
    res.render('index',
      {
        booksURL: '/books',
        watchURL: '/watch',
        title: 'COUCH SURF',
        result1: 'Here are the results!',
		result2: books 
      });
  });
});

module.exports = router;

