// const map = L.map("map").setView([28.6139, 77.209], 8);
let latitude = lat;
let longitude = long;
const map = L.map("map").setView([latitude, longitude], 10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Maps",
}).addTo(map);

L.marker([latitude,longitude]).addTo(map);

// let search = L.esri.Geocoding.geosearch().addTo(map);
// let result = L.layerGroup().addTo(map);

// search.on("result", function (data) {
//   result.clearLayers();

//   for (let i = data.result.length - 1; i >= 0; i--) {
//     result.addLayer(L.marker(data.result[i].latlng));
//   }
// });
 