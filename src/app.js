const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))


const app = express()

// Set port For Heroku  
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jack Yuan',
    })
})

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help page',
        name: 'Jack Yuan',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Jack Yuan'
    })
})

app.get('/address', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        })

    }
    res.send({
        address: 'Kelvin Grove'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide search product.'
        })
    }
    res.send({
        products: []
    })
    console.log(req.query)
    // console.log(req.query.rating)

})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        })
    }

    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                // console.log(latitude)
                // console.log(longitude)
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    // address: req.query.address,
    // forecast: 'It is raining.',
    // location: 'QLD'
    // })
})

app.get("/help/*", (req, res) => {
    res.render('404', {
        title: '8964',
        name: 'JY',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '8964',
        name: 'JY',
        errorMessage: 'Page 8964ed.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port .' + port)
})