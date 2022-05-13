const request = require("postman-request");
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=9d9ee517e64d79098a849db4077334ba&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const temperature = body.current.temperature;
      const weatherDescriptions = body.current.weather_descriptions[0];
      callback(undefined, { temperature, weatherDescriptions });
    }
  });
};

module.exports = forecast;
