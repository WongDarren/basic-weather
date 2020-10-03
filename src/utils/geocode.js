const request = require('request');
require('dotenv').config();

const geocode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=' +
		process.env.MAPBOX_API_KEY +
		'&limit=1';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services', undefined);
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try another search', undefined);
		} else {
			callback(undefined, {
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
