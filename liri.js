require("dotenv").config();

// variables
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

    default: console.log("\n" + "type any command after 'node liri.js': " + "\n" +
    "my-tweets" + "\n" + "spotify-this-song 'song title' " + "\n" + "do-what-it-says" + "\n" + "Use quotes for multiword titles!");

};


function myTweets() {
    var params = { screen_name: 'JP48957016'}
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
if (!error) {
    for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
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
        song_name = "The Sign";
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
    fs.writeFile("randon.txt", 'spotify-this-song,"The Sign"', function (err) {
        var song = "spotify-this-song 'The Sign'"
        if(err) {
            return console.log(err);
        };

        console.log(song);
    });
    

    
  };
// ^end of request


















//   }); //end of request(possibly)

  // no brackets only if "if" is doing one function
    // Then run a request to the OMDB API with the movie specified









 // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).


// ---------
// do-what-it-says


// You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.
//     This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     

 //end of function movie





// Make it so liri.js can take in one of the following commands:
// (if/else statements or switch)
// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says` 

// ????????????


// --------

// if(command == 'movie-this')  {
//     console.log(command);
//     moviethis(name);
   
// }

// ---------------

// SPOTIFY
//     * This will show the following information about the song in your terminal/bash window
     
//      * Artist(s)
     
//      * The song's name
     
//      * A preview link of the song from Spotify
     
//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.


// -----------

// console.log("The movie's rating is: " + JSON.parse(response.body).imdbRating);