'use strict';
var maps = window.maps = window.maps || {};
var Q = require('q');
var Map = require('./Map');

function loadScript(key, done) {
  var dfd = Q.defer();
  var script = document.createElement('script');

  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=' + key + '&callback=maps.googleMapsInitialized';

  dfd.promise.done(done);

  maps.googleMapsInitialized = dfd.resolve.bind(this, Map);
  document.body.appendChild(script);

  return dfd.promise;
}

module.exports = {
  load: loadScript
};
