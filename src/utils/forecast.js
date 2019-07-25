const request = require("request");

const forecast = (long, lat, callback) => {
    const url = `https://api.darksky.net/forecast/0e0c6432a4575c6dd4a0cb6251f7cdb1/${lat},${long}?units=si`
    request({ url: url, json: true }, (err, res) => {
        if (err) {
            callback("Unable to connect to weather service!", undefined)
        } else if (res.body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, {
                temperature: res.body.currently.temperature,
                precipitation_chances: res.body.currently.precipProbability,
                summary: res.body.daily.summary
            })
        }
    })
}

module.exports = forecast