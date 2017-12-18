//variable to store user's initial search input
var artist;
//array to store the list of searched artist and related artists(pulled from MusicGraph)
var artists = [];
//array to store the events object from BandsInTown API (only if artist has upcoming shows)
var results = [];

//images object to store artist images w/ events
var images = {};
//geocoder variables
var state;
var geocoder;
var eventLat = [];
var eventLong = [];

//MUSICGRAPH API
//Function Declaration for Searching MusicGraph
function searchMusicGraph(input) {
  //QueryURL using user search input as a parameter
  var queryURL =
    "http://api.musicgraph.com/api/v2/artist/suggest?api_key=c8303e90962e3a5ebd5a1f260a69b138&prefix=" +
    input;
  var apiURL = "https://proxy-cbc.herokuapp.com/proxy";

  $.ajax({
    url: apiURL,
    method: "POST",
    data: {
      url: queryURL
    }
  }).done(function(response) {
    var artistId = response.data.data[0].id;
    var artistQueryURL =
      "http://api.musicgraph.com/api/v2/artist/" +
      artistId +
      "/similar?api_key=c8303e90962e3a5ebd5a1f260a69b138&limit=10";
    $.ajax({
      url: apiURL,
      method: "POST",
      data: {
        url: artistQueryURL
      }
    }).done(function(response) {
      //Run a for loop to push the results (related artists) to artists array
      console.log(response);
      for (var i = 0; i < 10; i++) {
        artists.push(response.data.data[i].name);
      }

      for (var i = 0; i < artists.length; i++) {
        searchBandsInTown(artists[i]);
      }
    });
  });
}

//BANDSINTOWN API
//Function call for searching Bands in Town
function searchBandsInTown(input) {
  // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
  var queryURL =
    "https://rest.bandsintown.com/artists/" + input + "?app_id=codingbootcamp";

  //ajax call taking the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    //Check if there are upcoming shows, then run the event search if so
    if (response.upcoming_event_count > 0) {
      //push the images
      images[input.toLowerCase()] = response.thumb_url;
      var queryURLevents =
        "https://rest.bandsintown.com/artists/" +
        input +
        "/events?app_id=codingbootcamp";
      //ajax call for event search
      $.ajax({
        url: queryURLevents,
        method: "GET"
      }).done(function(response) {
        //add the events to the results array
        for (var a = 0; a < response.length; a++) {
          if (response[a].venue.region === state) {
            results.push(response[a]);
            carouselGenerator(
              response[a],
              images[input.toLowerCase()],
              response[a].venue.latitude,
              response[a].venue.longitude
            );
          }
        }
      });
    }
  });
}

//Use browser geolocation and google reverse geocoding api to get user's state
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    reverseGeoCode(position.coords.latitude, position.coords.longitude);
  });
} else {
  console.log("er");
  // make sure to handle the failure
}

function reverseGeoCode(lat, lng) {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode(
    {
      latLng: latlng
    },
    function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results) {
          // place your marker coding
          state = results[0].address_components[5].short_name;
          console.log(state);
        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    }
  );
}

//Pull the value from the search input field
//On keypress "Enter"
$("#search").keypress(function(e) {
  //If the keypress is "enter"
  if (e.which == 13 && state) {
    event.preventDefault();
    //Pull the value and put it in the artist variable
    artist = $("#search")
      .val()
      .trim();

    //Reset the value of the input field
    $("#search").val("");

    //Put the initial artist search in the artists array
    artists.push(artist);

    //Runt the Music Graph search for related artists array
    searchMusicGraph(artist);
    console.log(results);
  }
});

function parseEventResults(element) {
  eventLat.push(element.venue.latitude);
  eventLong.push(element.venue.longitude);
}

function initMap(latitude, longitude, mapInput) {
  var uluru = { lat: latitude, lng: longitude };
  var map = new google.maps.Map(document.querySelector(mapInput), {
    zoom: 15,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

function carouselGenerator(bandEvent, img, eventlatitude, eventlongitude) {
  // DYNAMICALLY CREATING THE CAROUSEL
  // create loop for every result to create a new card for the carousel

  // create <div class="carousel-item">
  var item = $("<div>");
  item.addClass("carousel-item");
  // append to <div class="carousel">
  $(".carousel").append(item);
  // =============PARENT DIV=========
  // create <div class="card sticky-action">
  var card = $("<div>");
  card.addClass("card sticky-action");
  // append to <div class="carousel-item">
  $(".carousel-item").append(card);
  // =========IMG DIV==============
  // create <div class="card-image waves-effect waves-block">
  var pic = $("<div>");
  pic.addClass("card-image waves-effect waves-block");
  // create img and link to url
  var photo = $("<img>");
  photo.addClass("activator");
  photo.attr("src", img);
  // John's img code
  // append <div class="card-image waves-effect waves-block">
  $(pic).append(photo);
  // append to <div class="card sticky-action">
  $(card).append(pic);
  // ========CARD CONTENT==========
  //create <div class="card-content">
  var content = $("<div>");
  content.addClass("card-content");
  // add span to the div
  var cardTitle = $("<span>");
  cardTitle.addClass("card-title activator grey-text text-darken-4");
  var formatDate = moment(bandEvent.datetime).format('LLLL');
  console.log(formatDate);
  //pull in name from bands in town
  cardTitle.text(bandEvent.lineup[0] + ": Playing at " + bandEvent.venue.name +" On " + formatDate);
  var vert = $("<i>more_vert</i>");
  vert.addClass("material-icons right");
  // append i to span
  cardTitle.append(vert);
  // append span to card-content
  content.append(cardTitle);
  // append to <div class="card sticky-action">
  card.append(content);
  // ==========CARD ACTION=========
  // create <div class="card-action">
  var action = $("<div>");
  action.addClass("card-action");
  // add <a href="#">Bandwebsite</a>
  var website = $("<div>");
  website.html("<a href='" + bandEvent.url + "'>BUY TICKETS</a>");
  action.append(website);
  // append to <div class="card sticky-action">
  $(card).append(action);
  // =========CARD REVEAL===========
  // create <div class="card-action card-reveal">
  var reveal = $("<div>");
  reveal.addClass("card-action card-reveal");
  var cardTitleTwo = $("<span>");
  cardTitleTwo.addClass("card-title grey-text text-darken-4");

  //Line 235 currently isn't doing anything
  cardTitleTwo.text(bandEvent.venue.name);
  
  var closeSymbol = $("<i>close</i>");
  closeSymbol.addClass("material-icons right");
  cardTitleTwo.append(closeSymbol);
  // var mapview = $("<div>");
  // var mapid = 'map';
  // mapview.attr('id', mapid);
  // parseEventResults(event);
  // initMap(eventlatitude, eventlongitude, mapid);
  // cardTitleTwo.append(mapview);
  reveal.append(cardTitleTwo);
  $(card).append(reveal);
  if ($(".carousel").hasClass("initialized")) {
    $(".carousel").removeClass("initialized");
  }
  $(".carousel").carousel();
}

function createCarouselItem() {
  console.log("test1");
  for (var i = 0; i < results.length; i++) {
    console.log("test2");
    var name = results[i].lineup[0].toLowerCase();
    carouselGenerator(results[i], images[name], eventLat[i], eventLong[i]);
  }
}
