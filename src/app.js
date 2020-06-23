const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hari Sood'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Hari Sood'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'If you need help, I want you to shove your fingers so far into your noobiness that you come out sideways. Then think twice about asking for help again.',
        title: 'Help',
        name: 'Hari Sood'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address to get your weather information'
        });
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                locationProblem: error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    forecastProblem: error
                });
            }

            res.send({ 
                address: req.query.address,
                location,
                forecast: forecastData
            });
        });
    });
});

app.get('/products', (req, res) => {
if (!req.query.search) {
    return res.send({
        error: 'You must provide a search term'
    });
}
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        message: 'Help article not found.',
        title: 'Error',
        name: 'Hari Sood'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        message: 'Page not found.',
        title: 'Error',
        name: 'Hari Sood'
    });
})



app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});