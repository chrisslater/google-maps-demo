'use strict';
var Q = require('q');
var elementClass = require('element-class');

function Map (options) {
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  var el = options.el;

  var map = createMap({
    zoom: options.zoom,
    center: createLatLng(options.lat, options.lng)
  });

  setupMarkers(options.markers);
  directionsDisplay.setMap(map);

  function createLatLng (lat, lng) {
    return new google.maps.LatLng(lat, lng);
  }

  function createMap (options) {
    return new google.maps.Map(el, options);
  }

  function setupMarkers (markers) {
    var _markers = [];

    markers.forEach(function (options) {
      var marker = createMarker(options);
      createMarkerWindow(marker, options.info);
      _markers.push(marker);
    });

    return _markers;
  }

  function createMarker (options) {
    var marker = new google.maps.Marker(options);
    var latLng = createLatLng(options.lat, options.lng);

    marker.setMap(map);
    marker.setPosition(latLng);
    return marker;
  }

  function createMarkerWindow (marker, options) {
    var infowindow = new google.maps.InfoWindow();
    var doc = parseStringToDOM(options.content);
    var btn = doc.getElementById('getDirections');

    btn.addEventListener('click', function(e) {
      setMapLoadingState(true);

      getCurrentLocation().done(function (latLng) {
        setMapLoadingState(false);
        calculateRoute(latLng, marker.getPosition());
        infowindow.close();
      });
    });

    infowindow.setContent(doc.children[0]);

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.open(map, marker);
      elementClass(btn).add('btn');
    });
  }

  function setMapLoadingState(state) {
    var s = state ? 'add' : 'remove';
    elementClass(el)[s]('loading');
  }

  function parseStringToDOM (str) {
    var parser = new DOMParser();
    return parser.parseFromString(str, "text/xml");
  }

  function getCurrentLocation () {
    var dfd = Q.defer();
    navigator.geolocation.getCurrentPosition(function (Geoposition) {
      var coords = Geoposition.coords;
      var latLng = createLatLng(coords.latitude, coords.longitude);
      dfd.resolve(latLng);
    });
    return dfd.promise;
  }

  function calculateRoute (start, end) {
    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function (result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }
    });
  }

  return this;
}

module.exports = Map;
