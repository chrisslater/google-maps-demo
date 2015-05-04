module.exports = {
  apiKey: 'AIzaSyC0HRvKyWyyyG19-aII-4jf6KpqTtxKTCM',
  mapSettings: {
    el: document.getElementById('map-canvas'),
    lat: 51.5009379,
    lng: -0.0864894,
    zoom: 16,
    markers: [
      {
        lat: 51.5009379,
        lng: -0.0864894,
        icon: 'amido.ico',
        title: 'Amido London',
        address: 'The Leathermarket, Weston Street, London, SE1 3ER',
        info: {
          content: '<button id="getDirections" class="btn">Get directions</button>'
        }
      }, {
        lat: 50.8276145,
        lng: -0.141528,
        icon: 'amido.ico',
        title: 'Amido Brighton',
        info: {
          content: '<button id="getDirections" class="btn">Get directions</button>'
        }
      }
    ]
  }
};
