const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js')

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

geocode.geocodeAddress(argv.a, (errorMessage, result) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log('\n');
    console.log(result.address);
    weather.fetchWeather(result.latitude, result.longitude, (errorMessage, weatherResult) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
      console.log('--------------------------------');
        console.log(`Current temperature na ${weatherResult.temperature}°C but e be like ${weatherResult.apparentTemp}°C\n`);
        console.log('***Make I advice you***');
        console.log(`Weather go dey ${weatherResult.summary}, but e fit change sha. Ji masun!`);
        console.log('--------------------------------');
      };
    });
  };
});
