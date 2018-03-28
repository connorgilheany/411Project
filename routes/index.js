var express = require('express');
var router = express.Router();

var request = require('request');
var url = 'https://www.googleapis.com/books/v1/volumes?q=hacker+terms';

var jj;

var books = request('https://www.googleapis.com/books/v1/volumes?q=food+terms', function (error, response, body) {
 // console.log(response)
  if (!error && response.statusCode == 200) {
  	ja = JSON.parse(body);
  	jj = ja.totalItems;
    console.log(jj); // gives undefined
    return jj
  }
});

console.log(jj);

//console.log(title)
/* GET book search */

//var result = request('https://www.googleapis.com/books/v1/volumes?q=hacker+terms', { json: true }, (err, res, body) => {
//  if (err) { return console.log(err); }
 // console.log(body.url);
 // console.log(body.explanation);
 // console.log(result)
//});
//var parsed = result.items[0].volumeInfo.title;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
    { title: 'Couch Surf',
      booksURL: '/books',
      watchURL: '/watch'  });
  res.render('index', { title: 'Couch Surf', book: parsed });
});

module.exports = router;

