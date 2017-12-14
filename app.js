// $(".dropdown-button").dropdown();

$(document).ready(function () {

    $('.carousel').carousel();

    // $(".dropdown-button").dropdown("click", function () {
    //     hover: false;

    });

    //hide search icon when icon is clicked
    $(".labe-icon active").click(function () {
        $("#searchIcon").addClass('hide');
    });




