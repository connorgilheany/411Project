var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = require('../config');
var request = require('request');

// var Yummly = require("ws-yummly");

// Yummly.config({
//  app_id : config.yummlyConfig.appID,
//  app_key : config.yummlyConfig.apiKey
// })

/* GET home page. */
router.get('/', function(req, res, next) {
    firebase.auth().onAuthStateChanged( user => {
    if (user) {
        // if there is a user logged on, render them home page
      this.userId = user.uid;
      res.render('food', {currentUser: "true", user: user.email, success: 'Welcome!', title: 'Couch Surf', results: [], resultsLength: 10 });
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
        var url = "http://api.yummly.com/v1/api/recipes?_app_id=" + config.yummlyConfig.appID + "&_app_key=" + config.yummlyConfig.apiKey + "&q=" + userQuery;
        var results = [];
        var resultsLength = 0;

        request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          let jsonBody = JSON.parse(body);
          console.log(jsonBody);
          console.log("Top 10 Results for " + userQuery);

                jsonBody.matches.forEach((item) => {
                    let foodResult = {};
                    foodResult.name = item.sourceDisplayName + ': ' + item.recipeName;
                    foodResult.url = 'https://www.yummly.com/recipe/' + item.id;
                    console.log(foodResult);
                    results.push(foodResult);
                });

          res.render('food', {
                    userQuery: userQuery,
                    results: results,
                    resultsLength: resultsLength,
                    currentUser: 'true'
                });
        } else {
          reject(Error("Error processing request to URL: " + parser));
        }
  });

    // let parser = (resultJSON) => {
    //   let bookTitles = [];
    //   resultJSON.items.slice(0, 10).forEach(item => {
    //     let bookResult = {};
    //     bookResult.title = item.volumeInfo.title;
    //     bookResult.previewLink = item.volumeInfo.previewLink;
    //     bookTitles.push(bookResult);
    //   })
    //   return bookTitles;
    // }


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

module.exports = router;
