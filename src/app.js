const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('../cli/utils/geocode');
const weather = require('../cli/utils/weather');

const app = express();

// Set up paths to views
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicPath));
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'weathercast',
        message: 'A weather time machine',
        name: 'Chinedu Dara'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Chinedu Dara'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Here\'s the documentation to guide you.',
        name: 'Chinedu Dara'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided.'
        })
    }

    geocode.geocodeAddress(req.query.address, (error, {address, latitude, longitude} = {}) => {
        if (error) {
            return res.send({error});
        };
        weather.fetchWeather(latitude, longitude, (error, {temperature, apparentTemp, summary, precipProbability} = {}) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                address,
                temperature,
                apparentTemp,
                precipProbability,
                summary
            })
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        message: 'Oops! Help article not found.',
        name: 'Chinedu Dara'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        message: 'Oops! Page not found.',
        name: 'Chinedu Dara'
    })
})

app.listen(3000, () => {console.log('Server started on port 3000')});    