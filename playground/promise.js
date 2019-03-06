const request = require('request');

let geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    if (address) {
    const apiKey = 'AIzaSyBleTNciXvf61oQu1bTPauOWvtsph35Hgo';
    let encodedAddress = encodeURIComponent(address);
    request({
      // My Google Developer Api Key: AIzaSyBleTNciXvf61oQu1bTPauOWvtsph35Hgo
      //Maps Api Url: https://maps.googleapis.com/maps/api/geocode/json?address=[Append location address]&key=[Append Api Key]
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
      json: true
    }, (error, response, body) => {
      if (error) {
          reject('Unable to connect to google srevers. Check internet access!');
      } else if (body.status === 'ZERO_RESULTS') {
          reject('Unable to find address. Provide another address!');
      } else if (body.status === 'OK') {
          resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          })
      } else {reject('Mogbe! An unknown error has occured.')}
    })} else {reject('No address provided!')}
  })
}

geocodeAddress(900001).then((location) => {
  console.log(location);
}, (errorMessage) => {
  console.log(errorMessage);
});
