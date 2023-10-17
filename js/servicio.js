const apiId = "7a347669d65ddf36ab4d0a291c760d6c";

const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiId}`;

fetch(url)
	.then((response) => response.json())
	.then((data) => console.log(data));
