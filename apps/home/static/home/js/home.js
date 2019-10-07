let map = L.map('map', {
    center: [45.508582, -73.568797],
    minZoom: 2,
    zoom: 13
});
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a', 'b', 'c']
}).addTo(map);
L.marker([45.508582, -73.568797]).addTo(map);
let uqam_station = {
    "Name": "Station UQAM",
    "lat": 45.508582,
    "lng": -73.568797,
    "Elevation": 80.0,
    "Year_ini": 2014,
    "Year_fin": 2018
}
let popup = "<br> <b>Nom de la station: </b>" + uqam_station.Name
    + "<br> <b>Élévation: </b>" + uqam_station.Elevation + " m"
    + "<br> <b>Début d'enregistrement: </b>" + uqam_station.Year_ini;
L.marker([uqam_station.lat, uqam_station.lng])
    .bindPopup(popup)
    .addTo(map);

function displayData(data) {
    console.log(data);
    let today = new Date();
    document.getElementById("temperature").innerHTML = `${data.temperature} °C`;
    document.getElementById("chillTemperature").innerHTML = `${data.chill} °C`;
    document.getElementById("date").innerHTML = `${today.getDay()}-${today.getMonth()}-${today.getFullYear()} ${data.Temps.split("-")[0]}:${data.Temps.split("-")[1]}`;
    document.getElementById("stationPressure").innerHTML = `${data["pressure station"]} hPa`;
    document.getElementById("seaLevelPressure").innerHTML = `${data.slp} hPa`;
    document.getElementById("dewPoint").innerHTML = `${data["dew point"]} °C`;
    document.getElementById("chill").innerHTML = `${data.chill} °C`;
    document.getElementById("humidity").innerHTML = `${data.humidite} %`;
    document.getElementById("windDirection").innerHTML = `${data.dir_wind} °`;
    document.getElementById("windSpeed").innerHTML = `${data.mod_wind} km/h`;
    document.getElementById("precipitation").innerHTML = `${data.precip1} mm`;
    document.getElementById("stackedPrecipitation").innerHTML = `${data.precip2} mm`;
    document.getElementById("weeklyStackedPrecipitation").innerHTML = `${data.precip3} mm`;
}
function generateDate(hourMinute) {

}

Papa.parse(`${media_url}data/UQAM_DATA_STATION_last.csv`, {
    download: true,
    header: true,
    complete: (result) => displayData(result.data[0])
});