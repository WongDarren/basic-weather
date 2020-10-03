const request = require('request');

const forecast = (address, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=2c15302aa10975562d0f95294a98391c&query=' +
		encodeURIComponent(address);

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services', undefined);
		} else if (body.error) {
			callback('Unable to find location. Try another search', undefined);
		} else {
			callback(undefined, {
				temp: body.current.temperature,
				longitude: body.location.lon,
				latitude: body.location.lat,
				location: body.location.name,
			});
		}
	});
};

module.exports = forecast;
