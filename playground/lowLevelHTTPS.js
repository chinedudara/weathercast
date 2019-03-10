const https = require('https');
const {apiKeys} = require('../cli/apiKeys');

const apiKey = apiKeys.mapbox;
const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${apiKey}`;

let request = https.request(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk.toString();
    })

    response.on('end', () => {
        console.log(JSON.parse(data))
    })
})

request.on('error', (e) => {
    console.log(e);
})

request.end();