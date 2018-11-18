const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather.js');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to featcher weather for',
      string: true
    },
  })
  .help()
  .alias('help','h')
  .alias('version','v')
  .argv;

const address = geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.street);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature}. It's feel ${weatherResults.apparentTemperature}`);
      }
    });
  }
});
