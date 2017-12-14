// Media query for carousel
$('.carousel.carousel-slider').carousel({fullWidth: true});
//Set up Materilaze navbar hover on document ready 
$(document).ready(function () {
   
    $(".dropdown-button").dropdown("click", function () {
        hover: false;
        
    })
});

//variable to store user's initial search input 
var artist;
//array to store the list of searched artist and related artists(pulled from MusicGraph)
var artists = [];
//array to store the events object from BandsInTown API (only if artist has upcoming shows)
var results = [];


//MUSICGRAPH API
//Function Declaration for Searching MusicGraph
function searchMusicGraph(input) {
    //QueryURL using user search input as a parameter
    var queryURL = "http://api.musicgraph.com/api/v2/artist/suggest?api_key=c8303e90962e3a5ebd5a1f260a69b138&prefix=" + input;

    //ajax call using the user's input
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {

        //Get the string provided in the JSON 
        var artistId = response.data[0].id;

        //Search for the related artists
        var artistQueryURL = "http://api.musicgraph.com/api/v2/artist/" + artistId + "/similar?api_key=c8303e90962e3a5ebd5a1f260a69b138&limit=10";

        $.ajax({
            url: artistQueryURL,
            method: 'GET'
        }).done(function (response) {

            //Run a for loop to push the results (related artists) to artists array 
            for (var i = 0; i < 5; i++) {
                artists.push(response.data[i].name)
            }

            console.log(artists);

        });

    });
}


//BANDSINTOWN API
//Function call for searching Bands in Town
function searchBandsInTown(input) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + input + "?app_id=codingbootcamp";
    
    //ajax call taking the queryURL 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        //Check if there are upcoming shows, then run the event search if so 
        if (response.upcoming_event_count > 0) {
            var queryURLevents = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
            //ajax call for event search
            $.ajax({
                url: queryURLevents,
                method: "GET"
            }).done(function (response) {

                //add the events to the results array 
                results.push(response);
            });
        }
    });

}


//GOOGLE MAPS API 
//API Key for Maps Access
var APIKey = "AIzaSyDtjjfGkVF17NIWDDcDW_uexEjIqA17Am4";

//Geoposition variable
var pos; 

//HTML5 Geolocation Access
if (navigator.geolocation) {
    
    //GetCurrentPosition Function
    navigator.geolocation.getCurrentPosition(function (position) {
        
        //pull the geolocation
         pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        console.log(pos);
    });
}

//Pull the value from the search input field
//On keypress "Enter"
$('#search').keypress(function (e) {

    //If the keypress is "enter"
    if (e.which == 13) {
        //Pull the value and put it in the artist variable
        artist = $('#search').val().trim();

        //Reset the value of the input field
        $('#search').val('');

        //Put the initial artist search in the artists array
        artists.push(artist);
        
        //Runt the Music Graph search for related artists array
        searchMusicGraph(artist);

        //Loop through each artist in the artists array
        artists.forEach(function (i) {

            //Find the events for the artists with the BandsInTown Search
            searchBandsInTown(i);
        });
        console.log(results);
    }
});

