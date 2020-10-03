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

	fetch('/weather?address=' + encodeURIComponent(address)).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				locationText.textContent = 'Error!';
			} else {
				locationText.textContent =
					data.forecast.name + ', ' + data.forecast.region;

				tempText.textContent =
					'It is ' +
					data.forecast.temp +
					' degrees celsius outside. With a ' +
					data.forecast.rainChance +
					'% chance of rain.';
			}
		});
	});
});
