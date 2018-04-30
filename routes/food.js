var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = require('../config');
var request = require('request');


// var Yummly = require("ws-yummly");

// Yummly.config({
// 	app_id : config.yummlyConfig.appID,
// 	app_key : config.yummlyConfig.apiKey
// })

/* GET home page. */
router.get('/', function(req, res, next) {
	firebase.auth().onAuthStateChanged( user => {
    if (user) { 
    	// if there is a user logged on, render them home page
      this.userId = user.uid;
      res.render('food', {currentUser: "true", user: user.email, success: 'Welcome!'});
    }
    else{
    	// else user is not logged on so give them signin page
    	res.render('food', {showLogin: "true"});
    }
  }); 
});



router.post('/', function(req, res, next){
	return new Promise((resolve, reject) => {
	var userQuery = req.body.query;
	var url = "http://api.yummly.com/v1/api/recipes?_app_id=" + config.yummlyConfig.appID + "&_app_key=" + config.yummlyConfig.apiKey + "q=flavor.sweet.min=0.8";

	request(url, (error, response, body) => {
              if (!error && response.statusCode == 200) {
                let jsonBody = JSON.parse(body);
                console.log(jsonBody);
                console.log("Results");
                console.log(jsonBody.matches[0].sourceDisplayName);
                res.render('food');
                

              } else {
                reject(Error("Error processing request to URL: " + parser));
              }
            });

    // Yummly.query('pineapple')
    //     .maxTotalTimeInSeconds(1400)
    //     .maxResults(20)
    //     .allowedDiets(['Pescetarian', 'Vegan'])
    //     .allowedCuisines(['asian'])
    //     .minRating(3)
    //     .get()
    //     .then(function(resp){
    //         resp.matches.forEach(function(recipe){
    //             console.log(recipe.recipeName);
    //         });
    //         res.render('food');

    //     });
	});
});

let parser = (resultJSON) => {
  let bookTitles = [];
  resultJSON.items.slice(0, 10).forEach(item => {
    bookTitles.push(item.volumeInfo.title);
  })
  return bookTitles;
}




module.exports = router;