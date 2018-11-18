const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to featcher weather for - example: "1301 Lombard St"',
      string: true
    },
  })
  .help()
  .alias('help','h')
  .alias('version','v')
  .argv;

  const encodeAddress = encodeURIComponent(argv.address);
  const key = 'OiQM9vmwHaCQUFA9JxbG1R06k9Jij0Ll';
  const geoUrl = `https://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${encodeAddress}`;

  axios.get(geoUrl)
    .then((response) => {
      console.log(JSON.stringify(response.data.info.statuscode, undefined, 2));
      if (response.data.info.statuscode === 400) {
        throw new Error("No Data or something like that")
      }
      const key = '0700d1e7426027eeff1e5a58b8899ed3';
      const latitude = response.data.results[0].locations[0].latLng.lat;
      const longitude = response.data.results[0].locations[0].latLng.lng;
      const weatherUrl = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`;
      console.log(response.data.results[0].locations[0].street);
      return axios.get(weatherUrl);
    })
    .then((response) => {
      if (response.statusCode === 400) {
        throw new Error("No data or one zombie apocalipse is near");
      }
      console.log(`It's currently ${response.data.currently.temperature}. It's feel ${response.data.currently.apparentTemperature}`);
    })
    .catch((e) => {
      if (e.code === 'ENOTFOUND' || e.code===404 ) {
        console.error("You're listening Limp Bizkit, this is a big problem, moreover, the server is out as well");
      } else {
        console.log(e);
      }
    });
