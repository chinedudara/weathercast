const request = require('request');
const {apiKeys} = require('./../apikeys');

let fetchWeather = (lat, lng, callback) => {
  const apiKey = apiKeys.darksky;
  const excludeBlocks = '?exclude=minutely,hourly,alerts,flags'
  request({
    url: `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}${excludeBlocks}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: degreeFToC(body.currently.temperature) ,
        apparentTemp: degreeFToC(body.currently.apparentTemperature),
        precipProbabilityToday: Math.round(body.daily.data[0].precipProbability),
        tempTodayHigh: degreeFToC(body.daily.data[0].temperatureHigh),
        tempTodayHighTime: unixToTimestamp(body.daily.data[0].temperatureHighTime),
        tempTodayLow: degreeFToC(body.daily.data[0].temperatureLow),
        tempTodayLowTime: unixToTimestamp(body.daily.data[0].temperatureLowTime),
        summaryToday: body.daily.data[0].summary
      })
    } else {
      callback('Chai! Unable to fetch weather.');
    }
  })
};

let degreeFToC = (degreeF) => {
  return Math.round((degreeF - 32) * 5/9);
};

let unixToTimestamp = (unix) => {
  let dateTime = new Date(unix * 1000);
  let meridian = ''
  let hour = dateTime.getHours();
  let minutes = `${(dateTime.getMinutes() < 10) ? 0 : null}${dateTime.getMinutes()}`;
  if (hour > 11 && hour < 24) {
    hour = (hour === 12) ? 12 : hour - 12;
    meridian = 'PM'
  } else if (hour === 24) {
    hour = 12;
    meridian = 'AM'
  } else {meridian = 'AM'}
  // let seconds = dateTime.getSeconds().toString();
  return `${hour}:${minutes} ${meridian}`;
};

module.exports = {fetchWeather, unixToTimestamp, degreeFToC};
