// $(".dropdown-button").dropdown();

$(document).ready(function () {

     $('.collapsible').collapsible();

     //Set up Materilaze navbar hover on document ready 
    $(".dropdown-button").dropdown("click", function () {
        hover: false;
    });

    $(".dropdown-button").dropdown("click", function () {
        hover: false; 
    })
});

