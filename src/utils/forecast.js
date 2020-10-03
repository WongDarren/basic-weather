const request = require('request');
require('dotenv').config();

const forecast = (address, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=' +
		process.env.WEATHERSTACK_API_KEY +
		'&query=' +
		encodeURIComponent(address);

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services', undefined);
		} else if (body.error) {
			callback('Unable to find location. Try another search', undefined);
		} else {
			callback(undefined, {
				temp: body.current.temperature,
				windSpeed: body.current.wind_speed,
				rainChance: body.current.precip,
				humidity: body.current.humidity,
				longitude: body.location.lon,
				latitude: body.location.lat,
				name: body.location.name,
				region: body.location.region,
				country: body.location.country,
			});
		}
	});
};

module.exports = forecast;
