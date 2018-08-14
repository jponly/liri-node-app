require("dotenv").config();

// variables used to gather data from
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var twitter = require('twitter');
var request = require("request");
var command = process.argv[2];
var movie_name = process.argv[3];


// All the code required to import the keys
 var spotify = new Spotify(keys.spotify);
 var client = new twitter(keys.twitter);

// switch statements
switch (command) {
    case "my-tweets":
    myTweets();
    break;

    case "spotify-this-song":
    spotifyThisSong();
    break;

    case "movie-this":
    movieThis();
    break;

    case "do-what-it-says":
    doWhatItSays();
    break;

    
};

function myTweets() {
        var params = { screen_name: 'JP48957016'}
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
        for (var i = 0; i < tweets.length; i++) {
           var date = tweets[i].created_at;
           console.log("@JP48957016: " + tweets[i].text + " Created: " + date.substring(0, 19));
        };
    } else {
        console.log("error: " + err);
        return;
        };

    });

    };


 function spotifyThisSong(song_name) {
        var song_name = process.argv[3];
        if(!song_name) {
            song_name = "Ace of Base: 'The Sign'";
        };
        songRequest = song_name;
        spotify.search({
            type:"track",
            query: songRequest
        },
 function (err, data) {
        if(!err) {
            var trackInfo = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (trackInfo[i] != undefined) {
                    var spotifyResults = 
                    "Artist: " + trackInfo[i].artists[0].name + "\n" +
                    "Song: " + trackInfo[i].name + "\n" +
                    "Preview URL: " + trackInfo[i].preview_url + "\n" +
                    "Album: " + trackInfo[i].album.name + "\n"

                    console.log(spotifyResults);
                    console.log('');
                };
            };
        } else {
            console.log("error: " + err);
            return;
        };
    });

    };


 function movieThis() {

    var queryUrl = "http://www.omdbapi.com/?t=" + movie_name + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
    
            var movieData = JSON.parse(body);
            var queryUrlResults = 
            "Title: " + movieData.Title + "\n" +
            "Year: " + movieData.Year + "\n" +
            "IMDB Rating: " + movieData.Ratings[0].Value + "\n" +
            "Rotten Tomatoes Rating: " + movieData.Ratings[1].Value + "\n" +
            "Country: " + movieData.Country + "\n" +
            "Language: " + movieData.Language + "\n" +
            "Plot: " + movieData.Plot + "\n" +
            "Actors: " + movieData.Actors + "\n" 

            console.log(queryUrlResults);
            
        } else {
            console.log("error: " + err);
            return;
        };
        
        
        });
    };


 function doWhatItSays() { 
        fs.writeFile("random.txt", "spotify-this-song, 'I want it That Way'", function (err) {
            var song = "spotify-this-song, 'I want it That Way'"
            if(err) {
            return console.log(err);
            };

            console.log(song);
    });
    
};
// end of request



















