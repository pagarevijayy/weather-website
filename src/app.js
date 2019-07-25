const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

//root route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app!',
        name: 'Vijay Pagare'
    })
})

//help route
app.get('/help', (req, res) => {
    res.render('help', {
        messageHelp: '“help will always be given at Hogwarts to those who ask for it”',
        title: 'Help',
        name: 'Vijay'
    })
})

//about route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me:',
        name: 'Vijay Pagare'
    })
})


//weather route
app.get('/weather', (req, res) => {
    location = req.query.location
    if (!location) {
        return res.send({
            error: "Please enter location."
        })
    }

    geocode(location, (err, geocodeData) => {
        if (err) {
            return res.send({
                error: err
            })
        }

        forecast(geocodeData.longitude, geocodeData.latitude, (err, forecastData) => {
            if (err) {
                return res.send({
                    error: err
                })
            }

            res.send({
                location: geocodeData.location,
                temperature: forecastData.temperature,
                summary: forecastData.summary
            })
        })
    })

    // Static json data:
    // console.log(req.query.adress);
    // res.send([{
    //     location: "mumbai",
    //     temperature: 29,
    //     address: req.query.address
    // },
    // {
    //     location: "dhule",
    //     temperature: 33
    // }])
})

//other 404 routes
app.get('/help/*', (req, res) => {
    res.send('help article not found.')
})

app.get('*', (req, res) => {
    res.send('My 404 page.')
})

app.listen(3000, () => {
    console.log("Server is up and running on port 3000..");
})