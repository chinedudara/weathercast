const yargs = require('yargs');
const axios = require('axios');

const {apiKeys} = require('./apikeys');

const argv = yargs
            .options({
              a: {
                demand: true,
                description: 'Address to fetch weather forcast for.',
                alias: 'address',
                string: true
              }
            })
            .help()
            .alias('help', 'h')
            .argv;

const apiKey = apiKeys.geocode;
let encodedAddress = encodeURIComponent(argv.a);
let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

let degreeFToC = (degreeF) => {
  return Math.round((degreeF - 32) * 5/9);
};

axios.get(url).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find address. Provide another address!')
  } else if (response.data.status === 'OK') {
    console.log(response.data.results[0].formatted_address);
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    const weatherApiKey = apiKeys.darksky;
    const excludeBlocks = '?exclude=minutely,hourly,daily,alerts,flags'
    let weatherUrl = `https://api.darksky.net/forecast/${weatherApiKey}/${lat},${lng}${excludeBlocks}`;
    return axios.get(weatherUrl);
  }
}).then((response) => {
    console.log('--------------------------------');
    console.log(`Current temperature na ${degreeFToC(response.data.currently.temperature)}°C but e be like ${degreeFToC(response.data.currently.apparentTemperature)}°C\n`);
    console.log('***Make I advice you***');
    console.log(`Weather go dey ${response.data.currently.summary}, but e fit change sha. Ji masun!`);
    console.log('--------------------------------');
}).catch((error) => {
  if (error.code === 'ENOTFOUND') {
    console.log('Unable to connect to google servers. Check internet access!');
  } else {
    console.log(error.message);
  }
})
