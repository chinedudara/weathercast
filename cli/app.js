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
geocode.geocodeAddress(address, (errorMessage, {address, longitude, latitude} = {}) => {
  if (errorMessage) {
    log(chalk.red.inverse('Request Failed!'))
    log(chalk.red(errorMessage));
  } else {
    log('\n');
    log(chalk.cyan.inverse(address));
    weather.fetchWeather(latitude, longitude, (errorMessage, 
      {temperature,apparentTemp,precipProbabilityToday,tempTodayHigh,tempTodayHighTime,tempTodayLow,tempTodayLowTime,summaryToday
    } = {}) => {
      if (errorMessage) {
        log(chalk.red.inverse('Request Failed!'))
        log(chalk.red(errorMessage));
      } else {
      log(chalk.green('---------------------------------------------'));
      log(chalk`{gray.inverse Current Temperature:} {magenta ${temperature}°C} but feels like {red ${apparentTemp}°C}`);
      log(chalk`{gray Chances of Rainfall:} {cyan ${precipProbabilityToday}%}`);
      log(chalk`{gray.inverse Highest Temperature:} {red ${tempTodayHigh}°C} at {yellow ${tempTodayHighTime}}`);
      log(chalk`{gray Lowest Temperature:} {blue ${tempTodayLow}°C} at {yellow ${tempTodayLowTime}}`);
      log(chalk`{gray.inverse Weather Summary Today:} {red.inverse ${summaryToday}}`)
        log(chalk.green('---------------------------------------------'));
      };
    });
  };
});
