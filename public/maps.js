let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 40.1533693, lng: 44.4185276},
        zoom: 15,
    });

    initAutoComplete(map);

    google.maps.event.addListener(map, "click", function (event) {
        placeMarker(event.latLng);
        console.log(event.latLng.lat(), "latPoint");
        console.log(event.latLng.lng(), "lngPoint");
    });
}

function placeMarker(location) {
    return new google.maps.Marker({
        position: location,
        map: map,
        icon: {
            url: "https://fountainhillcenter.org/wp-content/uploads/twitter.png",
            scaledSize: new google.maps.Size(40, 40),
        }
    });
}

function initAutoComplete(map) {
    let input = document.getElementById("myInput");
    let searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener("bounds_changed", function () {
        searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener("places_changed", function () {
        let places = searchBox.getPlaces();

        if (places.length === 0) {
            return;
        }
        console.log(places, "placess");

        let bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }

            placeMarker(place.geometry.location);

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}