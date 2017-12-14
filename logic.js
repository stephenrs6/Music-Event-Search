//variable to store user's initial search input 
var artist;
//array to store the list of searched artist and related artists(pulled from MusicGraph)
var artists = [];
//array to store the events object from BandsInTown API (only if artist has upcoming shows)
var results = [];
var filteredResults;

//geocoder variables
var state;
var geocoder;

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
                artists.push(response.data[i].name);
            }

            for (var i = 0; i < artists.length; i++){
                searchBandsInTown(artists[i]);
            }

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
                for (var a = 0; a < response.length; a++) {
                    if (response[a].venue.region === state) {
                        results.push(response[a]);
                    }
                }
            });
        }
    });
}

//Use browser geolocation and google reverse geocoding api to get user's state
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        reverseGeoCode(position.coords.latitude, position.coords.longitude);
    });
} else {
    console.log("er")
    // make sure to handle the failure
}

function reverseGeoCode(lat, lng) {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({
        'latLng': latlng
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results) {
                // place your marker coding 
                state = results[0].address_components[5].short_name;
                console.log(state);
            } else {
                alert('No results found');
            }
        } else {
            alert('Geocoder failed due to: ' + status);
        }
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
        console.log(results);
    }
});

