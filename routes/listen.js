var express = require('express');
var router = express.Router();
var firebase = require('firebase');

var user = firebase.auth().currentUser;

//Import the Spotify API
var Spotify = require('node-spotify-api');

//Import our Keys File
var keys = require('../config');

//Create a Spotify Client
var spotify = new Spotify({
    id: keys.spotifyKeys.id,
    secret: keys.spotifyKeys.secret
});

//Store the results of a request to spotify
var results = [];

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index.hbs', {title: 'Spotify', results: results});
});


router.post('/', function (req, res) {
    //Get the type of Query from the User
    var type = 'track';

    //Get the query from the user
    var query = req.body.param_query;

    //Clear out old results
    results = [];

    // Check firebase for query
/**
    // if query in firebase, pull out firebase data
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.userID = user.uid;
                var query = firebase.database().ref('cache/').child(user.uid).child('spotify/');
                query.once("value").then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var key = childSnapshot.key;
                        if (key == query) {
                            // resolve()
                            resolve(childSnapshot.child("result").val());
                            console.log("Its in the database");
                        }
                        else {
                            console.log("Hitting Spotify api");
                            spotify.search({type: type, query: query})
                                .then(function (spotRes) {
                                    //Store the artist, song, preview link, and album in the results array
                                    spotRes.tracks.items.forEach(function (ea) {
                                        results.push({
                                            artist: ea.artists[0].name,
                                            song: ea.name,
                                            preview: 'https://open.spotify.com/embed?uri=spotify:track:' + ea.external_urls.spotify.substring(31),
                                            album: ea.album.name
                                        });
                                    });
                                    resolve(results);
                                    console.log("Now inserting to firebase");
                                    firebase.database().ref('cache/').child(user.uid).child('spotify/').child(query).update(ea);
                                    //Render the homepage and return results to the view
                                    res.render('index.hbs', {title: 'Spotify', results: results});
                                })
                                .catch(function (err) {
                                    console.log(err);
                                    reject(Error("Error!"));
                                    throw err;
                                });
                        }
                    })
                })
            }
        });
    });

});
    // else make wrapper request
**/
    //Make a request to Spotify
    spotify.search({type: type, query: query})
        .then(function (spotRes) {
            //Store the artist, song, preview link, and album in the results array
            spotRes.tracks.items.forEach(function(ea){
                results.push({artist: ea.artists[0].name,
                    song: ea.name,
                    preview: 'https://open.spotify.com/embed?uri=spotify:track:' + ea.external_urls.spotify.substring(31),
                    album: ea.album.name});
            });
            //Render the homepage and return results to the view
            res.render('index.hbs', {title: 'Spotify', results: results});
        })
        .catch(function (err) {
            console.log(err);
            throw err;
        });
});

module.exports = router;
