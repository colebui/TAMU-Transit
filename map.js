function initMap() {

    // The location of cstat
    var cstat = {
        lat: 30.601389,
        lng: -96.314445
    };
    // The map, centered at cstat
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 4,
            center: cstat,
            mapTypeControl: true,
            mapTypeControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER
            }

        });
    // The marker, positioned at cstat
    var marker = new google.maps.Marker({
        position: cstat,
        map: map
    });
}