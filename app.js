const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

if (process.argv.length !== 3) {
  return console.log("Usage: node app.js <place>");
}
geocode(process.argv[2], (err, data) => {
  if (err) {
    console.log(err);
  } else {
    forecast(data.latitude, data.longitude, (e, d) => {
      if (e) {
        console.log(e);
      } else {
        console.log(`${data.place_name}`);
        console.log(
          `${d.weather_descriptions}. It is currently ${d.temperature} degrees. It feels like ${d.feelslike} degrees.`
        );
      }
    });
  }
});
