console.log('Client side script loaded');

const addressForm = document.querySelector('form');
const status = document.getElementById('status');
const address = document.getElementById('address');
const temperature = document.getElementById('temperature');
const apparentTemp = document.getElementById('apparentTemp');
const precipProbability = document.getElementById('precipProbability');
const summary = document.getElementById('summary');

let addressData = document.getElementById('addr');

addressForm.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = 'fetching weather data...'
    
fetch(`/weather?address=${addressData.value}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            status.textContent = data.error;
        } else {
            status.textContent = 'done.'
            temperature.textContent = data.temperature;
            apparentTemp.textContent = data.apparentTemp;
            address.textContent = data.address;
            summary.textContent = data.summary;
            precipProbability.textContent = data.precipProbability;
        }
    })
})
})