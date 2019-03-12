const path = require('path');
const axios = require('axios');
const chalk = require('chalk');

const {apiKeys} = require('./apikeys');
const {degreeFToC, unixToTimestamp} = require('./utils/weather');

const log = console.log;
const address = process.argv[2];
if (!address) {
  log(chalk.red.inverse('No Address Provided!'))
  return log(chalk.red('Use the format:', chalk`{greenBright node} {yellowBright ${path.basename(__filename,'.js')}} {blueBright "Address to fetch weather for"}`))
}

const apiKey = apiKeys.geocode;
let encodedAddress = encodeURIComponent(address);
let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

axios.get(url).then(({data}) => {
  if (data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find address. Provide another address!')
  } else if (data.status === 'OK') {
    log(chalk.cyan.inverse(data.results[0].formatted_address));
    let lat = data.results[0].geometry.location.lat;
    let lng = data.results[0].geometry.location.lng;
    const weatherApiKey = apiKeys.darksky;
    const excludeBlocks = '?exclude=minutely,hourly,alerts,flags'
    let weatherUrl = `https://api.darksky.net/forecast/${weatherApiKey}/${lat},${lng}${excludeBlocks}`;
    return axios.get(weatherUrl);
  }
}).then((response) => {
    let res = response.data;
    log(chalk.green('---------------------------------------------'));
    log(chalk`{gray.inverse Current Temperature:} {magenta ${degreeFToC(res.currently.temperature)}°C} but feels like {red ${degreeFToC(res.currently.apparentTemperature)}°C}`);
    log(chalk`{gray Chances of Rainfall:} {cyan ${Math.round(res.daily.data[0].precipProbability)}%}`);
    log(chalk`{gray.inverse Highest Temperature:} {red ${degreeFToC(res.daily.data[0].temperatureHigh)}°C} at {yellow ${unixToTimestamp(res.daily.data[0].temperatureHighTime)}}`);
    log(chalk`{gray Lowest Temperature:} {blue ${degreeFToC(res.daily.data[0].temperatureLow)}°C} at {yellow ${unixToTimestamp(res.daily.data[0].temperatureLowTime)}}`);
    log(chalk`{gray.inverse Weather Summary Today:} {red.inverse ${res.daily.data[0].summary}}`)
    log(chalk.green('---------------------------------------------'));
}).catch((error) => {
  if (error.code === 'ENOTFOUND') {
    log(chalk.red.inverse('Request Failed!'))
    log(chalk.red('Unable to connect to google servers. Check internet access!'));
  } else {
    log(chalk.red.inverse('Request Failed!'))
    log(chalk.red(error.message));
  }
})
