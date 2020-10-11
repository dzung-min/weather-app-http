const http = require("http");

function forecast(latitude, longitude, callback) {
  const url = `http://api.weatherstack.com/current?access_key=b6697f76dd83a79fd3d503adbdfe71b6&query=${latitude},${longitude}`;
  const req = http.request(url, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const dataObj = JSON.parse(data);
      if (dataObj.hasOwnProperty("error")) {
        callback("Location was not found.");
      } else {
        const {
          weather_descriptions,
          temperature,
          feelslike,
        } = dataObj.current;
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
