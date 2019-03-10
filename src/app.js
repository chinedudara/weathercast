const path = require('path');
const express = require('express');

const app = express();
const PublicPath = path.join(__dirname, '../public');
app.use(express.static(PublicPath));

app.get('/', (req, res) => {
    res.send('Hello Express');
});

app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1>')
})

app.get('/weather', (req, res) => {
    res.send({
        forcast: '25 degrees',
        location: 'Lagos, Nigeria'
    })
})

app.listen(3000, () => {console.log('Server started on port 3000')});    