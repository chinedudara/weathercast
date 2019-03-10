const path = require('path');
const axios = require('axios');
const chalk = require('chalk');

const {apiKeys} = require('./apikeys');

const log = console.log;
const address = process.argv[2];
if (!address) {
  log(chalk.red.inverse('No Address Provided!'))
  return log(chalk.red('Use the format:', chalk`{greenBright node} {yellowBright ${path.basename(__filename,'.js')}} {blueBright "Address to fetch weather for"}`))
}

const apiKey = apiKeys.geocode;
let encodedAddress = encodeURIComponent(address);
let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

let degreeFToC = (degreeF) => {
  return Math.round((degreeF - 32) * 5/9);
};

axios.get(url).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find address. Provide another address!')
  } else if (response.data.status === 'OK') {
    log(response.data.results[0].formatted_address);
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    const weatherApiKey = apiKeys.darksky;
    const excludeBlocks = '?exclude=minutely,hourly,daily,alerts,flags'
    let weatherUrl = `https://api.darksky.net/forecast/${weatherApiKey}/${lat},${lng}${excludeBlocks}`;
    return axios.get(weatherUrl);
  }
}).then((response) => {
    log('--------------------------------');
    log(`Current temperature na ${degreeFToC(response.data.currently.temperature)}°C but e be like ${degreeFToC(response.data.currently.apparentTemperature)}°C\n`);
    log('***Make I advice you***');
    log(`Weather go dey ${response.data.currently.summary}, but e fit change sha. Ji masun!`);
    log('--------------------------------');
}).catch((error) => {
  if (error.code === 'ENOTFOUND') {
    log('Unable to connect to google servers. Check internet access!');
  } else {
    log(error.message);
  }
})
