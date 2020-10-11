const http = require("http");

function forecast(latitude, longitude, callback) {
  const url = `http://api.weatherstack.com/current?access_key=b6697f76dd83a79fd3d503adbdfe71b6&query=${latitude},${longitude}`;
  const req = http.request(url, (res) => {
    res.on("data", (d) => {
      const data = JSON.parse(d.toString());
      if (data.hasOwnProperty("error")) {
        callback("Location was not found.");
      } else {
        const { weather_descriptions, temperature, feelslike } = data.current;
        callback(null, { weather_descriptions, temperature, feelslike });
      }
    });
  });
  req.on("error", () => {
    callback("Can't connect to weather API.");
  });
  req.end();
}

module.exports = forecast;
