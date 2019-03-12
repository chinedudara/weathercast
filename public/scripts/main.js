console.log('Client side script loaded');


// const result = document.getElementById('result');
const resultDiv = document.getElementById('result');
resultDiv.style.display = 'none';

const addressForm = document.querySelector('form');
const status = document.getElementById('status');
const address = document.getElementById('address');
const temperature = document.getElementById('temperature');
const apparentTemp = document.getElementById('apparentTemp');
const precipProbabilityToday = document.getElementById('precipProbabilityToday');
const tempTodayHigh = document.getElementById('tempTodayHigh');
const tempTodayHighTime = document.getElementById('tempTodayHighTime');
const tempTodayLow = document.getElementById('tempTodayLow');
const tempTodayLowTime = document.getElementById('tempTodayLowTime');
const summaryToday = document.getElementById('summaryToday');

let addressData = document.getElementById('addr');

addressForm.addEventListener('submit', (event) => {
    resultDiv.style.display = 'none';
    status.className = '';
    event.preventDefault();
    status.className = 'processing';
    status.textContent = 'fetching weather data...'
    
fetch(`/weather?address=${addressData.value}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            status.className = 'error';
            status.textContent = data.error;
        } else {
            status.className = 'success';
            status.textContent = 'done.'
            temperature.textContent = data.temperature;
            apparentTemp.textContent = data.apparentTemp;
            address.textContent = data.address;
            summaryToday.textContent = data.summaryToday;
            precipProbabilityToday.textContent = data.precipProbabilityToday;
            tempTodayHigh.textContent = data.tempTodayHigh;
            tempTodayHighTime.textContent = data.tempTodayHighTime;
            tempTodayLow.textContent = data.tempTodayLow;
            tempTodayLowTime.textContent = data.tempTodayLowTime;
            resultDiv.style.display = 'block';
            setTimeout(() => {
                status.textContent = '';
            }, 3000)
        }
    })
})
})