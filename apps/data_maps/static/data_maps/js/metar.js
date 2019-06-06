$.getJSON('/media/data/METER.json', (ECmarkers) => {
  let map = L.map('map', {
    center: [65.0, -90.0],
    minZoom: 2,
    zoom: 2
  });
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a', 'b', 'c']
  }).addTo(map);
  let markerClusters = L.markerClusterGroup();

  for (let i = 0; i < ECmarkers.length; ++i) {
    let popup = "<br> <b>Station METARS </b>"
      + "<br> <b>Nom: </b>" + ECmarkers[i].STATION
      + "<br> <b>IATA: </b>" + ECmarkers[i].IATA
      + "<br> <b>Année début: </b>" + ECmarkers[i].Year_ini
      + "<br> <b>Année fin: </b>" + ECmarkers[i].Year_fin

    let m = L.marker([ECmarkers[i].lat, ECmarkers[i].lng])
      .bindPopup(popup);
    markerClusters.addLayer(m);
  }
  map.addLayer(markerClusters);
});