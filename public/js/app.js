console.log('Client side js is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const locationText = document.querySelector('#location');
const tempText = document.querySelector('#temp');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const address = search.value;

	locationText.textContent = 'Loading . . .';
	tempText.textContent = '';

	fetch(
		'http://localhost:3000/weather?address=' + encodeURIComponent(address)
	).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				console.log(data.error);
				locationText.textContent = 'Error!';
			} else {
				console.log(data.forecast);
				locationText.textContent = 'Location: ' + data.forecast.location;
				tempText.textContent =
					'Temperature is ' + data.forecast.temp + ' celsius';
			}
		});
	});
});
