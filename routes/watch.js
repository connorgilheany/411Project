var express = require('express');
var network = require('../network');
var config = require("../config");
var router = express.Router();

/* GET watch page. */
router.get('/', function(req, res, next) {
    getTrendingVideos().then((videos) => {
        var videoID = videos[0].id;
        res.render('watch',
        {
            title: "COUCH SURF",
            videoList: videos,
            videoURL: "https://www.youtube.com/embed/"+videoID,
            currentUser: 'true'
        });
    });
});

router.post('/', (req, res, next) => {
    var videoID = req.body.videoID
    getTrendingVideos().then((videos) => {
        res.render('watch', {
            title: "COUCH SURF",
            videoList: videos,
            videoURL: "https://www.youtube.com/embed/"+videoID
        });
    });
})

let getTrendingVideos = () => {
    return network.callNoCache("https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=25&key=" + config.youtubeAPIKey, parser)
}

let parser = (resultJSON) => {
    let videoKeys = [];
    resultJSON.items.forEach(video => {
        videoKeys.push(video);
    });
    return videoKeys
}



module.exports = router;
