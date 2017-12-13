var APIKey = "AIzaSyDtjjfGkVF17NIWDDcDW_uexEjIqA17Am4";

//     // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(pos);
        });
    }


