
var eventLat = [];
var eventLong = [];
var results = [{venue : {latitude: 32.748445, longitude: -117.130271}},{venue : {latitude: 32.5895282, longitude: -117.0066818}    
}];

var maps = ["#testmap"];

console.log(results);
function parseEventResults (results) {
    results.forEach(function(element){
        eventLat.push(element.venue.latitude);
        eventLong.push(element.venue.longitude);
    });
}

function initMap(latitude, longitude, mapInput) {
    var uluru = {lat: latitude, lng: longitude};
    var map = new google.maps.Map(document.querySelector(mapInput), {
      zoom: 15,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }



 parseEventResults(results);
 
 for (var i=0; i < eventLat.length; i++){
     initMap(eventLat[i], eventLong[i], maps[i]);
 }
 
