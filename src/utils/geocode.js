const request = require('request')

const geocode = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoienN1YW9hIiwiYSI6ImNqdzBoY2dzNjBiM2s0NW1tNjRtYzdhZTgifQ.4V3kWJm4oeBqvJpHUBxxHg&limit=1'
    // encodeURIComponent(address)

    request({
        url: geoUrl,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to internet services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find the location! Try another search!', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name,

            })

        }
    })
}


module.exports = geocode