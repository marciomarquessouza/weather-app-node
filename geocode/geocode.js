const request = require('request');

const geocodeAddress = (address, callback) => {
  const encodeAddress = encodeURIComponent(address);
  const key = 'OiQM9vmwHaCQUFA9JxbG1R06k9Jij0Ll';
  const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${encodeAddress}`;
  const maps = request({
    url,
    json: true,
  }, (error, response, body) => {
    if (response.body.info.statuscode === 0) {
      const location = body.results[0].locations[0];
      callback(undefined, {
        street: location.street,
        city: location.adminArea5,
        state: location.adminArea3,
        country: location.adminArea1,
        latitude: location.latLng.lat,
        longitude : location.latLng.lng,
      });
    } else if (response.body.info.statuscode === 400){
      callback(JSON.stringify(response.body.info.messages));
    } else if (error) {
      callback(JSON.stringify(error));
    } else {
      callback(JSON.stringify(`Undefined error with code ${response.body.info.statuscode }`));
    }
  });
};

module.exports = {
  geocodeAddress,
};
