const request = require('request');
const fs = require('fs');

const getWeather = (latitude, longitude, callback) => {
  const key = '0700d1e7426027eeff1e5a58b8899ed3';
  const url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`;
  request({
    url,
    json: true,
  }, (error, response, body) => {
    if (response.statusCode === 200) {
      const currently = response.body.currently;
      callback(undefined, {
        temperature: currently.temperature,
        pressure: currently.pressure,
        humidity: currently.humidity,
        windSpeed: currently.windSpeed,
        apparentTemperature: currently.apparentTemperature,
      });
    } else if (response.statusCode === 400 || error) {
      callback('Not Found');
    }
  });
};

module.exports.getWeather = getWeather;
