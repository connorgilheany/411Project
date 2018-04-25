var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Couch Surf', 
    booksURL: '/books',
    watchURL: '/watch',
    signupURL: '/signup' });
});



module.exports = router;
