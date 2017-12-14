// $(".dropdown-button").dropdown();

$(document).ready(function () {

    // function for dropdown menu in nav bar
    $(".dropdown-button").dropdown();

     
     //Set up Materilaze navbar hover on document ready 
    $(".dropdown-button").dropdown("click", function () {
        hover: false;
    });

    // collapsible function
    $('.collapsible').collapsible();
});


// DYNAMICALLY CREATING THE CAROUSEL

// create loop for every result to create a new card for the carousel
// create <div class="carousel-item">
var item = $("<div>");
item.addClass('carousel-item');
// append to <div class="carousel">
$(".carousel").append(item);
// =============PARENT DIV========= 
// create <div class="card sticky-action">
var card = $('<div>');
card.addClass('card sticky-action');
// append to <div class="carousel-item">
$(".carousel-item").append(card);
// =========IMG DIV==============
// create <div class="card-image waves-effect waves-block">
    // create img and link to url 
// append to <div class="card sticky-action">

// ========CARD CONTENT==========
//create <div class="card-content">
// add span to the div
// append to <div class="card sticky-action">

// ==========CARD ACTION=========
// create <div class="card-action">
// add <a href="#">Bandwebsite</a>
// append to <div class="card sticky-action">

// =========CARD REVEAL===========
// create <div class="card-action card-reveal"> 
// add span with collapsible content
    // add content link
// append to <div class="card sticky-action">





