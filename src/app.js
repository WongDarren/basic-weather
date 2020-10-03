const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up hbs engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', { title: 'Weather App', name: 'Darren Wong' });
});

app.get('/help', (req, res) => {
	res.render('help', { title: 'Help page', name: 'Darren Wong' });
});

app.get('/about', (req, res) => {
	res.render('about', { title: 'About page', name: 'Darren Wong' });
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({ error: 'You must provide an address' });
	}

	// { location } is destructured from the weatherstack API response
	geocode(req.query.address, (error, { location } = {}) => {
		if (error) {
			return res.send({ error });
		}

		forecast(location, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}

			res.send({
				forecast: forecastData,
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({ error: 'You must provide a search term' });
	}

	console.log(req.query);
	res.send({ products: [] });
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Error 404',
		error: 'Help article not found',
		name: 'Darren Wong',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: 'Error 404',
		error: 'Page not found',
		name: 'Darren Wong',
	});
});

app.listen(port, () => {
	console.log('Server on port ' + port);
});
