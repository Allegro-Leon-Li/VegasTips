var map;
var markers = [];
var largeInfowindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 36.1059912, lng: -115.1751949},
    zoom: 14
  });

  largeInfowindow = new google.maps.InfoWindow();
  var defaultIcon = makeMarkerIcon('0091ff');
  var highlightedIcon = makeMarkerIcon('FFFF24');

  for (var i = 0; i < markerModels.length; i++) {
    // Get the position from the location array.
    var position = {lat: markerModels[i].lat, lng: markerModels[i].lng};
    // console.log(position);
    var title = markerModels[i].name;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      venue_id: markerModels[i].venue_id,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: i
    });
    markerModels[i].marker = marker;
    // Push the marker to our array of markers.
    markers.push(marker);
    // Create an onclick event to open the large infowindow at each marker.
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
    // Two event listeners - one for mouseover, one for mouseout,
    // to change the colors back and forth.
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });
    showListings();
  }
}


function errorMap() {
  console.log('error loading Google Map API');
}
// This function will loop through the markers array and display them all.
function showListings() {
  var bounds = new google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}


// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
  var API_URL = 'https://api.foursquare.com/v2/venues/';
  var VENUE_ID = marker.venue_id;
  var CLIENT_ID = 'NAXJZWQKMG00NNBV0KZFJKM5ZHHU05KXJF4I13WDXJ3YRY0I';
  var SECRET = 'W0QLJH3DU0DOUGBIHFRKC2EZYAH4DYI0WAJF4IGCQJM4TDJS';
  var FOURSQUARE_VERSION = '20170801'
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    // Clear the infowindow content to give the streetview time to load.
    infowindow.marker = marker;
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
    map.panTo(marker.getPosition());
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        marker.setAnimation(null);
    }, 800);
    infowindow.setContent('loading...');
    $.ajax({
      url: API_URL + VENUE_ID + '/tips?client_id=' + CLIENT_ID + '&client_secret=' + SECRET + '&v=' + FOURSQUARE_VERSION,
      success: function(data) {
        console.log(data);
        infowindow.setContent('<p>' + data.response.tips.items[0].text + '</p>')
      },
      error: function(error) {
        infowindow.setContent('<p>Error loading Foursquare information with error</p>')
      }
    });
    console.log(marker);
    infowindow.open(map, marker);
  }
}


// This function will loop through the listings and hide them all.
function hideMarkers(markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}
