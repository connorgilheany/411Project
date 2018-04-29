var express = require('express');
var network = require('../network');
var config = require("../config");
var router = express.Router();

/* GET watch page. */
router.get('/', function(req, res, next) {
    getTrendingVideos().then((videos) => {
        console.log("Rendering");
        res.render('watch',
        {
            title: "COUCH SURF",
            videoList: videos
        });
    });
});

let getTrendingVideos = () => {
    console.log("Getting videos");
    return network.call("https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=US&maxResults=25&key=" + config.youtubeAPIKey, parser, "kddfd")//TODO remove query string
}

let parser = (resultJSON) => {
    console.log("Parsing videos");
    let videoKeys = [];
    resultJSON.items.forEach(video => {
        videoKeys.push(video);
    });
    return videoKeys
}



module.exports = router;
