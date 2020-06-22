const request = require('postman-request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic29vZHk3NjUiLCJhIjoiY2tibmx2bnI5MXR5YTJ5bHNpdnA2c3ptNyJ9.j7HR6MS3K4IOnrVnpapZVw&limit=1`;

    request( {url, json: true }, (error, { body }) => {
        if (error) {
            callback(`Unable to connect to location services!`);
        } else if (body.features.length === 0) {
            callback(`Unable to find location!`);
        } else {
            const details = body.features[0];
            callback(undefined, {
                latitude: details.center[1],
                longitude: details.center[0],
                location: details.place_name
            })
        }
    })
}

module.exports = geoCode