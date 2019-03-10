const chalk = require('chalk');
const path = require('path');

const geocode = require('./utils/geocode.js');
const weather = require('./utils/weather.js')

const log = console.log;
const address = process.argv[2];
if (!address) {
  log(chalk.red.inverse('No Address Provided!'))
  return log(chalk.red('Use the format:', chalk`{greenBright node} {yellowBright ${path.basename(__filename,'.js')}} {blueBright "Address to fetch weather for"}`))
}

// Used object destructuring to pass in 2nd arguments in the geocodeAddress & fetchWeather callback functions
geocode.geocodeAddress(address, (errorMessage, {address, longitude, latitude}) => {
  if (errorMessage) {
    log(errorMessage);
  } else {
    log('\n');
    log(chalk.cyan(address));
    weather.fetchWeather(latitude, longitude, (errorMessage, {temperature, apparentTemp, precipProbability, summary}) => {
      if (errorMessage) {
        log(errorMessage);
      } else {
      log(chalk.green('-----------------------------------------------'));
        log(`Current temperature na ${chalk.blue(temperature)}°C but e be like ${chalk.red.bold(apparentTemp)}°C.\n I dey ${chalk.magenta(precipProbability)}% sure say rain fit fall today.`);
        log(chalk.green.inverse('***Make I advice you***'));
        log(`Weather go dey ${chalk.cyan(summary)}, but e fit change sha. Ji masun!`);
        log(chalk.green('-----------------------------------------------'));
      };
    });
  };
});
