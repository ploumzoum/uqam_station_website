$.getJSON(`${media_url}data/SOUNDING.json`, (ECmarkers) => {
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
    let popup = '<b>Name:</b>' + ECmarkers[i].STATION
      + '<button type="button" class="btn" data-id="/donnees/sounding/formulaire">';

    let m = L.marker([ECmarkers[i].lat, ECmarkers[i].lng])
      .bindPopup(popup);
    markerClusters.addLayer(m);
  }
  map.addLayer(markerClusters);
});