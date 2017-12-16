

// function carouselGenerator(results, name){
// // DYNAMICALLY CREATING THE CAROUSEL
// // create loop for every result to create a new card for the carousel
// for (i = 0; i < results.length; i++) {
//     // create <div class="carousel-item">
//     var item = $("<div>");
//     item.addClass('carousel-item');
//     // append to <div class="carousel">
//     $(".carousel").append(item);
//     // =============PARENT DIV========= 
//     // create <div class="card sticky-action">
//     var card = $('<div>');
//     card.addClass('card sticky-action');
//     // append to <div class="carousel-item">
//     $(".carousel-item").append(card);
//     // =========IMG DIV==============
//     // create <div class="card-image waves-effect waves-block">
//     var pic = $('<div>');
//     pic.addClass('card-image waves-effect waves-block');
//     // create img and link to url 
//     var photo = $("<img>");
//     photo.addClass('activator');
//     photo.attr('src', (name));
//     // John's img code
//     // append <div class="card-image waves-effect waves-block">
//     $(pic).append(photo);
//     // append to <div class="card sticky-action">
//     $(card).append(pic);
//     // ========CARD CONTENT==========
//     //create <div class="card-content">
//     var content = $('<div>');
//     content.addClass("card-content");
//     // add span to the div
//     var cardTitle = $("<span>");
//     cardTitle.addClass("card-title activator grey-text text-darken-4");
//     //pull in name from bands in town
//     cardTitle.text(PUT ARTIST HERE + " Is Playing @ " + PUT VENUE HERE);
//     var vert = $("<i>more_vert</i>");
//     vert.addClass("material-icons right");
//     // append i to span
//     cardTitle.append(vert)
//     // append span to card-content
//     content.append(cardTitle);
//     // append to <div class="card sticky-action">
//     card.append(content);
//     // ==========CARD ACTION=========
//     // create <div class="card-action">
//     var action = $('<div>');
//     action.addClass("card-action");
//     // add <a href="#">Bandwebsite</a>
//     var website; 
//     website.html("<a href='" + (PUT LINK HERE) + "'>BUY TICKETS</a>");
//     action.append(website);
//     // append to <div class="card sticky-action">
//     $(card).append(action);
//     // =========CARD REVEAL===========
//     // create <div class="card-action card-reveal"> 
//     var reveal = $('<div>');
//     reveal.addClass("card-action card-reveal");
//     var cardTitleTwo = ("<span>");
//     cardTitleTwo.addClass("card-title grey-text text-darken-4");
//     cardTitle.text(VENUE NAME GOES HERE);
//     var closeSymbol = $("<i>close</i>");
//     closeSymbol.addClass("material-icons right");
//     cardTitleTwo.append(closeSymbol);
//     var mapview = $("<div>");
//     var mapid = 'map';
//     mapview.attr('id', mapid);
//     initMap(LATITUDE GOES HERE, LONGITUDE GOES HERE, mapid);
//     cardTitleTwo.append(mapview);
//     reveal.append(cardTitleTwo);
//     // add span with collapsible content
//     // add content link
//     // append to <div class="card sticky-action">
//     $(card).append(reveal);


// }
// }