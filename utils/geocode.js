const https = require("https");

function geocode(place, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    place
  )}.json?access_token=pk.eyJ1IjoiZHp1bmduZ3V5ZW4iLCJhIjoiY2tnMjJmeTNwMDVibTJxbzF6aTh2aXpnOSJ9.SgV4_8znoolkhhLCwbXRTw&limit=1`;
  const req = https.request(url, (res) => {
    res.on("data", (d) => {
      const data = JSON.parse(d.toString()).features[0];
      if (!data) {
        callback("Invalid location. Please try again.");
      } else {
        const [longitude, latitude] = data.center;
        const { place_name } = data;
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
