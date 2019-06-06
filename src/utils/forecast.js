const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/59be4efa0f02f16b55f58be4bc69288c/' + latitude + ',' + longitude + '?units=si'

    request({
            url: url,
            json: true
        }, (error, response) => {
            if (error) {
                callback('Not able to connect to internet!', undefined)
            } else if (response.body.error) {
                callback('Location not found, try another search.', undefined)
            } else {
                callback(undefined, response.body.daily.data[0].summary + '\nIt is currently ' + response.body.currently.temperature + ' degress out. \nThere is a ' + response.body.currently.precipProbability + '% chance of rain.')
            }
        }

    )
}

module.exports = forecast