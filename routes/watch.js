var express = require('express');
var network = require('../network');
var config = require("../config");
var router = express.Router();

/* GET watch page. */
router.get('/', function(req, res, next) {
    getTrendingVideos().then((videos) => {
        res.render('watch',
        {
            title: "COUCH SURF",
            videoList: videos
        });
    });
});

router.post('/', (req, res, next) => {
    console.log("post received");
})

let getTrendingVideos = () => {
    return network.call("https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=25&key=" + config.youtubeAPIKey, parser, "videos", "trending")
}

let parser = (resultJSON) => {
    let videoKeys = [];
    resultJSON.items.forEach(video => {
        videoKeys.push(video);
    });
    return videoKeys
}



module.exports = router;
