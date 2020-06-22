const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url =`http://api.weatherstack.com/current?access_key=a3f4cd2bd05e9a250ca9e714caa35b2d&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=m`;

    request({url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!');
        } else if (body.error) {
            callback(`${body.error.info}`)
        } else {
            const currently = body.current;
            const {weather_descriptions:weather, temperature, feelslike} = currently;

            callback(undefined, `${weather}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`);
        }
    });
}

module.exports = forecast;

