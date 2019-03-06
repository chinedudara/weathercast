const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
            .options({
              a: {
                demand: true,
                description: 'Address for weather forcast',
                alias: 'address',
                string: true
              }
            })
            .help()
            .alias('help', 'h')
            .argv;

const apiKey = 'AIzaSyBleTNciXvf61oQu1bTPauOWvtsph35Hgo';
let encodedAddress = encodeURIComponent(argv.a);
let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

axios.get(url).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find address. Provide another address!')
  } else if (response.data.status === 'OK') {
    console.log(response.data.results[0].formatted_address);
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    const weatherApiKey = 'e2651a350bb84c72283f84d63b3da253';
    let weatherUrl = `https://api.darksky.net/forecast/${weatherApiKey}/${lat},${lng}`;
    return axios.get(weatherUrl);
  }
}).then((response) => {
    console.log(response);
    console.log(`Current temperature na ${response.data.currently.temperature}°F but e be like ${response.data.currently.apparentTemperature}°F\n`);
    console.log('***Make I advice you***');
    console.log(`Weather go dey ${response.data.currently.summary}, but e fit change sha. Ji masun!`);
    console.log('--------------------------------');
}).catch((error) => {
  if (error.code === 'ENOTFOUND') {
    console.log('Unable to connect to google srevers. Check internet access!');
  } else {
    console.log(error.message);
  }
})
