function map_init_basic(map, options) {
  L.marker([45.508582, -73.568797]).addTo(map);
  let uqam_station = {
    "Name": "Station UQAM",
    "lat": 45.508582,
    "lng": -73.568797,
    "Elevation": 80.0,
    "Year_ini": 2014,
    "Year_fin": 2018
  }
  let  popup = "<br> <b>Nom de la station: </b>" +uqam_station.Name
            + "<br> <b>Élévation: </b>" + uqam_station.Elevation +" m"
            + "<br> <b>Début d'enregistrement: </b>" + uqam_station.Year_ini;
  L.marker( [uqam_station.lat, uqam_station.lng])
    .bindPopup(popup)
    .addTo(map);
}