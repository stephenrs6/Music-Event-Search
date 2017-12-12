
//From Kevin/John
$(document).ready(function () {

    $(".dropdown-button").dropdown("click", function () {
        hover: false;
    })
});

//BandsinTown API Call and functionality 
var artist;
var artists = [];
var results = [];

function searchBandsInTown(input) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + input + "?app_id=codingbootcamp";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        if (response.upcoming_event_count > 0) {
            var queryURLevents = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
            $.ajax({
                url: queryURLevents,
                method: "GET"
            }).done(function (response) {
                results.push(response);
            });
        }
    });

}


// //Google Maps API and functionality 
// var APIKey = "AIzaSyDtjjfGkVF17NIWDDcDW_uexEjIqA17Am4";

// //     // Try HTML5 geolocation.
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//         var pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//         };
//         console.log(pos);
//     });
// }





//MusicGraph API and functionality 
// !!!CHANGE BELOW TO USER INPUT!!!
function searchMusicGraph(input) {
    var queryURL = "http://api.musicgraph.com/api/v2/artist/suggest?api_key=c8303e90962e3a5ebd5a1f260a69b138&prefix=" + input;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {
        var artistId = response.data[0].id;

        var artistQueryURL = "http://api.musicgraph.com/api/v2/artist/" + artistId + "/similar?api_key=c8303e90962e3a5ebd5a1f260a69b138&limit=10";

        $.ajax({
            url: artistQueryURL,
            method: 'GET'
        }).done(function (response) {
            for (var i = 0; i < 5; i++) {
                artists.push(response.data[i].name)
            }

            console.log(artists);

        });

    });
}




$('#search').keypress(function (e) {
    if (e.which == 13) {
        artist = $('#search').val().trim();
        $('#search').val('');
        artists.push(artist);
        searchMusicGraph(artist);
        artists.forEach(function (i) {
            searchBandsInTown(i);
        });
        console.log(results);
    }
});

