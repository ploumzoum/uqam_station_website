// See post: http://asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps
function map_init_basic(map, options) {
  map.panTo([60.0, -100.0]);
  map.setZoom(2);
  map.setMinZoom(2);
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a', 'b', 'c']
  }).addTo(map);
  $.getJSON('/media/data/METER.json', (ECmarkers) => {
    var markerClusters = L.markerClusterGroup();

    for (var i = 0; i < ECmarkers.length; ++i) {
      var popup = "<br> <b>Station METARS </b>"
        + "<br> <b>Nom: </b>" + ECmarkers[i].STATION
        + "<br> <b>IATA: </b>" + ECmarkers[i].IATA
        + "<br> <b>Année début: </b>" + ECmarkers[i].Year_ini
        + "<br> <b>Année fin: </b>" + ECmarkers[i].Year_fin

      var m = L.marker([ECmarkers[i].lat, ECmarkers[i].lng])
        .bindPopup(popup);

      markerClusters.addLayer(m);
    }

    map.addLayer(markerClusters);
  });


  // L.marker([45.508582, -73.568797]).addTo(map);
  // let uqam_station = {
  //   "Name": "Station UQAM",
  //   "lat": 45.508582,
  //   "lng": -73.568797,
  //   "Elevation": 80.0,
  //   "Year_ini": 2014,
  //   "Year_fin": 2018
  // }
  // let  popup = "<br> <b>Nom de la station: </b>" +uqam_station.Name
  //           + "<br> <b>Élévation: </b>" + uqam_station.Elevation +" m"
  //           + "<br> <b>Début d'enregistrement: </b>" + uqam_station.Year_ini;
  // L.marker( [uqam_station.lat, uqam_station.lng])
  //   .bindPopup(popup)
  //   .addTo(map);
}
