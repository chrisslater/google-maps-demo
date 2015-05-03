var config = require('./config');
var maps = require('./maps/loader');

maps.load(config.apiKey)

  .done(function (Map) {
    var map = new Map(config.mapSettings);
  });
