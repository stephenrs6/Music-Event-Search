var artists = ['Pink Floyd', 'Led Zeppelin', 'Weezer'];
var results = [];

function searchBandsInTown(artist) {
    
        // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
            if(response.upcoming_event_count > 0){
            results.push(response);
            }
        });
        var queryURLevents = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        $.ajax({
            url: queryURLevents,
            method: "GET"
        }).done(function(response) {
            console.log(response);
        });
    }

artists.forEach(function(i){
    searchBandsInTown(i);
});

console.log(results);