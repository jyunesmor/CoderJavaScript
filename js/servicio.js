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

const ApiNoticias = "3a2247b6010a496286df43c08d87876d";

const urlNoti = `https://newsapi.org/v2/everything?q=keyword&apiKey=${ApiNoticias}`;

const resNoti = await fetch(urlNoti);
const dataNoti = await resNoti.json();

const mostrar_noticias = document.querySelector("#noticias");

/* dataNoti.articles.map((noticia) => {
	let noti = document.createElement("div");

	noti.innerHTML = `
		<div class="card">
			<img src=${noticia.urlToImage} class="card-img" alt="...">
			<div class="card-body d-flex flex-column justify-content-end">
				<h5 class="card-title">${noticia.title}</h5>
				<p class="card-text">${noticia.description}</p>
				<p class="card-text"><small>${noticia.author}</small></p>
			</div>
		</div>
		`;

	mostrar_noticias.appendChild(noti);
});

console.log(noticias);
 */
