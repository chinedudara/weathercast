const request = require('request');
const {apiKeys} = require('./../apiKeys');

let geocodeAddress = (address, callback) => {
    if (address) {
    const apiKey = apiKeys.geocode;
    let encodedAddress = encodeURIComponent(address);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
      json: true
    }, (error, {body}) => {
      if (error) {
          callback('Unable to connect to google srevers. Check internet access!');
      } else if (body.status === 'ZERO_RESULTS') {
          callback('Unable to find address. Provide another address!');
      } else if (body.status === 'OK') {
          callback(undefined, {
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          })
      } else {callback('Mogbe! An unknown error has occured.')}
    })} else {callback('No address provided!')}
}
module.exports = {geocodeAddress};
