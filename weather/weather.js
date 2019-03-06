const request = require('request');
const {apiKeys} = require('./../apiKeys');

let fetchWeather = (lat, lng, callback) => {
  const apiKey = apiKeys.darksky;
  const excludeBlocks = '?exclude=minutely,hourly,daily,alerts,flags'
  request({
    url: `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}${excludeBlocks}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: degreeFToC(body.currently.temperature) ,
        apparentTemp: degreeFToC(body.currently.apparentTemperature),
        summary: body.currently.summary
      })
    } else {
      callback('Chai! Unable to fetch weather.');
    }
  })
};

let degreeFToC = (degreeF) => {
  return Math.round((degreeF - 32) * 5/9);
};

module.exports.fetchWeather = fetchWeather;
