import { CuotaMensual } from "./Cuota.js";
import { dom } from "./dom.js";
import { datosTemp } from "./servicio.js";

function filtrarPorDocumento(documento) {
	let dbPrestamos = [];
	dbPrestamos = JSON.parse(localStorage.getItem("usuario"));
	return dbPrestamos.filter((usuario) => usuario._dni === documento);
}

function filtrarPorSistema(sistema) {
	let dbPrestamos = [];
	dbPrestamos = JSON.parse(localStorage.getItem("usuario"));
	return dbPrestamos.filter((usuario) =>
		usuario._prestamo.some((prestamo) => prestamo._sistema === sistema)
	);
}

function filtrarPorNombre(nombre) {
	let dbPrestamos = [];
	dbPrestamos = JSON.parse(localStorage.getItem("usuario"));
	return dbPrestamos.filter((usuario) => usuario._nombre === nombre);
}

function cargarTablaBusqueda(usuarios) {
	limpiarTablaBusqueda();
	usuarios.forEach((usuario) => {
		let { _prestamo } = usuario;
		let [, , , , sistema] = _prestamo;
		const fila = document.createElement("tr");

		fila.innerHTML = `
        <td> ${usuario._apellido} </td>
        <td> ${usuario._nombre} </td>
        <td> ${usuario._dni} </td>
        <td> ${sistema._sistema} </td>
        <td>$ ${usuario._totalPrestamo} </td>
      `;
		dom.respuestaBusqueda.appendChild(fila);
	});
}

function cargaDetalle() {
	limpiarInfo();
	const filaInfo = document.createElement("span");
	filaInfo.innerHTML = `
            * Los Valores de Cuota incluyen IVA(21 %), Comisión Administrativa(5 %), y Tasa de Interes del 10 %.-
            `;
	dom.respuestaSimulacionInfo.appendChild(filaInfo);
}

function cargarTablaTitulo() {
	const filaTitulo = document.createElement("tr");
	const tituloBusqueda = document.createElement("h2");

	tituloBusqueda.innerHTML = `Listado de Prestamos Otorgados`;
	filaTitulo.innerHTML = `
        <th>Apellido</th>
        <th>Nombre</th>
        <th>Documento</th>
        <th>Sistema Prestamo</th>
        <th>Total Prestamo</th>
      `;
	dom.tituloBusqueda.appendChild(tituloBusqueda);
	dom.respuestaBusquedaTabla.appendChild(filaTitulo);
}

function mostrarClima() {
	const clima = document.createElement("div");

	clima.innerHTML = `
            <h5 class="text-center">Clima en ${datosTemp.name}</h5>
						<div class="d-flex flex-row justify-items-around align-items-center">
							<div class="d-flex flex-column justify-content-center align-items-center">
								<img src="https://openweathermap.org/img/wn/${
									datosTemp.icon
								}@2x.png" alt="icon"/>
								<span class="tempDescrip text-center w-100">${datosTemp.description.toUpperCase()}
								</span>
							</div>
							<div class="d-flex flex-column w-100">
								<h2 class="d-flex justify-content-center align-items-center ">${datosTemp.temp.toFixed(
									1
								)}°C</h2>
								<div class="d-flex flex-row justify-content-around align-items-center">
									<p class="m-auto">Max: ${datosTemp.temp_max.toFixed(1)}°C
									</p>
									<p class="m-auto">Min: ${datosTemp.temp_min.toFixed(1)}°C
									</p>
								</div>
							</div>
						</div>
						`;

	dom.clima.appendChild(clima);
}

function cargarTablaCuota(prestamo) {
	limpiarTabla();
	prestamo.forEach((cuota, i) => {
		const fila = document.createElement("tr");

		fila.innerHTML = `
        <td> ${i + 1} </td>
        <td> $ ${cuota._total} *</td>
        <td> $ ${cuota._capital} </td>
        <td> $ ${cuota._interes} </td>
      `;
		dom.respuestaSimulacion.appendChild(fila);
	});
}

function limpiarTablaBusqueda() {
	while (dom.respuestaBusqueda.firstChild) {
		dom.respuestaBusqueda.removeChild(dom.respuestaBusqueda.firstChild);
	}
}

function limpiarTabla() {
	while (dom.respuestaSimulacion.firstChild) {
		dom.respuestaSimulacion.removeChild(dom.respuestaSimulacion.firstChild);
	}
}

function limpiarInfo() {
	while (dom.respuestaSimulacionInfo.firstChild) {
		dom.respuestaSimulacionInfo.removeChild(
			dom.respuestaSimulacionInfo.firstChild
		);
	}
}

function calcularCuota(prestamo, plazo, interes, iva, comisionAdm, sistema) {
	const cuota = [];
	let cuotaFija;
	let mes = 1;
	console.log(prestamo);

	if (sistema === "frances") {
		cuotaFija =
			(prestamo * (interes / 100)) / (1 - Math.pow(interes / 100 + 1, -plazo));
	} else if (sistema === "americano") {
		cuotaFija = mes === plazo ? prestamo : 0;
	} else {
		cuotaFija = prestamo / plazo;
	}

	do {
		console.log(cuotaFija);
		const cuotaMensual = new CuotaMensual();
		cuotaMensual.setSistema = sistema;
		cuotaMensual.setInteres = ((prestamo * interes) / 100).toFixed(2);
		cuotaMensual.setIva = (cuotaFija * iva).toFixed(2);
		cuotaMensual.setComisionAdm = (cuotaFija * comisionAdm).toFixed(2);
		if (sistema === "frances") {
			cuotaMensual.setCapital = (cuotaFija - cuotaMensual.getInteres).toFixed(
				2
			);
		} else if (sistema === "americano") {
			cuotaMensual.setCapital = mes === plazo ? prestamo : 0;
		} else {
			cuotaMensual.setCapital = (prestamo / plazo).toFixed(2);
		}
		cuotaMensual.setTotal = (
			Number(cuotaMensual.getCapital) +
			Number(cuotaMensual.getInteres) +
			Number(cuotaMensual.getIva) +
			Number(cuotaMensual.getComisionAdm)
		).toFixed(2);

		cuota.push(cuotaMensual);
		prestamo -= cuotaFija;
		mes += 1;
	} while (mes <= plazo);

	return cuota;
}

export const filtros = {
	filtrarPorDocumento,
	filtrarPorNombre,
	filtrarPorSistema,
};

export const tablas = {
	cargarTablaTitulo,
	cargarTablaBusqueda,
	cargarTablaCuota,
	cargaDetalle,
	mostrarClima,
};

export const calculo = {
	calcularCuota,
};
