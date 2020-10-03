const request = require('request');

const geocode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=pk.eyJ1Ijoid29uZ2Q0IiwiYSI6ImNrZml2MmV3eTA0MDEycXBjZnAwYm02amMifQ.Zkhbo81jwGk31wIcHAo9Cg&limit=1';

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
