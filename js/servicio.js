export let lon;
export let lat;

window.addEventListener("DOMContentLoaded", () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			lon = position.coords.longitude;
			lat = position.coords.latitude;
		});
	}
});

const apiId = "7a347669d65ddf36ab4d0a291c760d6c";
const urlName = `https://api.openweathermap.org/data/2.5/weather?q=cordoba&appid=${apiId}&units=metric&lang=sp`;

const res = await fetch(urlName);
const data = await res.json();

const {
	name,
	weather: [{ description, icon }],
	main: { temp, temp_min, temp_max, humidity, pressure, feels_like },
	wind: { speed },
	visibility,
	sys: { country, sunrise, sunset },
} = data;

let sunrise_act = new Date(sunrise * 1000).toLocaleDateString();
let sunset_act = new Date(sunset * 1000).toLocaleDateString();

export const datosTemp = {
	lon,
	lat,
	name,
	country,
	speed,
	temp,
	temp_max,
	temp_min,
	sunrise_act,
	sunset_act,
	humidity,
	pressure,
	feels_like,
	icon,
	description,
	visibility,
};

