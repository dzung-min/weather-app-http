const https = require("https");

function geocode(place, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    place
  )}.json?access_token=pk.eyJ1IjoiZHp1bmduZ3V5ZW4iLCJhIjoiY2tnMjJmeTNwMDVibTJxbzF6aTh2aXpnOSJ9.SgV4_8znoolkhhLCwbXRTw&limit=1`;
  const req = https.request(url, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const dataObj = JSON.parse(data).features[0];
      if (!dataObj) {
        callback("Invalid location. Please try again.");
      } else {
        const [longitude, latitude] = dataObj.center;
        const { place_name } = dataObj;
        callback(null, { latitude, longitude, place_name });
      }
    });
  });
  req.on("error", () => {
    callback("Can not connect to geocode API.");
  });
  req.end();
}

module.exports = geocode;
