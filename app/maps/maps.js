var config = {
  lat: 51.5009379,
  lon: -0.0864894,
  zoom: 16,
  apiKey: 'AIzaSyC0HRvKyWyyyG19-aII-4jf6KpqTtxKTCM'
};

var directionsDisplay;
var directionsService;

function scriptLoaded () {
  directionsService = new google.maps.DirectionsService();
  initialize(config);
}

function initialize (config) {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    zoom: config.zoom,
    center: new google.maps.LatLng(config.lat, config.lon),
    overviewMapControl: true
  };

  var myLatLng = new google.maps.LatLng(config.lat, config.lon);
  var image = 'amido.ico';

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: image,
      title: 'Hello World!'
  });

  var infowindow = new google.maps.InfoWindow({
      content: '<button id="getDirections">Get directions</button>'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });

  google.maps.event.addListener(infowindow, 'domready', function() {
    var btn = document.getElementById('getDirections');
    btn.addEventListener('click', function(e) {
      calcRoute();
      infowindow.close();
    });
  });

  directionsDisplay.setMap(map);
}

function calcRoute() {
  var start = 'Sandleheath';
  var end = 'amido, London';
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}

window.scriptLoaded = scriptLoaded;

module.exports = {
  load: function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + config.apiKey + '&callback=scriptLoaded';
    document.body.appendChild(script);
  }
};
