const request = require("postman-request");

const geocode = (address, calback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoib21hcm1ldG13YWgiLCJhIjoiY2wybHo2aTN5MHYzOTNrbDE2MGJnYmRqdiJ9.Z711oeOq-56QkchjWuP6jA&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      calback("Unable to connect to location service!", undefined);
    } else if (body.features.length === 0) {
      calback("Unable to find this location!", undefined);
    } else {
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      const location = body.features[0].place_name;

      calback(undefined, { latitude, longitude, location });
    }
  });
};

module.exports = geocode;
