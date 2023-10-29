const consultaPrest = document.querySelector("#consultaPrest");
const solicitarPrest = document.querySelector("#solicitarPrest");
const periodo = document.querySelector("#plazo");
const amortizacion = document.querySelector("#sistema");
const importe = document.querySelector("#solicitud");
const panelPrestamo = document.querySelector(".panelPrestamo");
const buscadorPrestamos = document.querySelector("#buscadorPrestamos");
const tipoBusqueda = document.querySelector("#tipoBusqueda");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const dni = document.querySelector("#documento");
const email = document.querySelector("#email");

const clima = document.querySelector("#clima");
const respuestaSimulacion = document.querySelector(
	"#respuestaSimulacion tbody"
);
const respuestaSimulacionInfo = document.querySelector(
	"#respuestaSimulacion p"
);
const tituloBusqueda = document.querySelector("#tituloBusqueda");
const respuestaBusqueda = document.querySelector("#respuestaBusqueda tbody");
const respuestaBusquedaTabla = document.querySelector(
	"#respuestaBusqueda thead"
);
const btnSolicitar = document.querySelector("#btnSolicitar");
const btnSimular = document.querySelector("#btnSimular");
const btnSolicitarPrest = document.querySelector("#btnSolicitarPrest");
const btnBuscar = document.querySelector("#btnBuscar");
const btnCancelarBusqueda = document.querySelector("#btnCancelarBusqueda");

export const dom = {
	clima,
	consultaPrest,
	solicitarPrest,
	panelPrestamo,
	buscadorPrestamos,
	respuestaSimulacion,
	respuestaSimulacionInfo,
	respuestaBusqueda,
	respuestaBusquedaTabla,
	tituloBusqueda,
};

export const datos = {
	periodo,
	amortizacion,
	importe,
	tipoBusqueda,
	nombre,
	apellido,
	dni,
	email,
};

export const botones = {
	btnSolicitar,
	btnSimular,
	btnSolicitarPrest,
	btnBuscar,
	btnCancelarBusqueda,
};
