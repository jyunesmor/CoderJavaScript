import { CuotaMensual } from "./Cuota.js";
import { dom } from "./dom.js";
import { datosTemp } from "./servicio.js";

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
	calcularCuotaAleman,
	calcularCuotaAmericano,
	calcularCuotaFrances,
};

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

function calcularCuotaAmericano(prestamo, plazo, interes, iva, comisionAdm) {
	const cuota = [];

	let mes = 1;
	while (mes <= plazo) {
		const cuotaAmericana = new CuotaMensual();
		cuotaAmericana.setIva = prestamo * iva;
		cuotaAmericana.setComisionAdm = prestamo * comisionAdm;
		cuotaAmericana.setSistema = "AMERICANO";
		cuotaAmericana.setInteres = ((prestamo * interes) / 100).toFixed(2);

		if (mes === plazo) {
			cuotaAmericana.setCapital = prestamo.toFixed(2);
			cuotaAmericana.setTotal = (
				Number(cuotaAmericana.getInteres) +
				Number(cuotaAmericana.getIva) +
				Number(cuotaAmericana.getComisionAdm) +
				prestamo
			).toFixed(2);
			cuota.push(cuotaAmericana);
		} else {
			cuotaAmericana.setCapital = 0;
			cuotaAmericana.setTotal = (
				Number(cuotaAmericana.getInteres) +
				Number(cuotaAmericana.getIva) +
				Number(cuotaAmericana.getComisionAdm)
			).toFixed(2);

			cuota.push(cuotaAmericana);
		}
		mes += 1;
	}
	return cuota;
}

function calcularCuotaFrances(prestamo, plazo, interes, iva, comisionAdm) {
	const cuota = [];

	let cuotaFija =
		(prestamo * (interes / 100)) / (1 - Math.pow(interes / 100 + 1, -plazo));

	while (prestamo > 1) {
		const cuotaFrances = new CuotaMensual();
		cuotaFrances.setIva = (cuotaFija * iva).toFixed(2);
		cuotaFrances.setComisionAdm = (cuotaFija * comisionAdm).toFixed(2);
		cuotaFrances.setSistema = "FRANCES";
		cuotaFrances.setInteres = (prestamo * (interes / 100)).toFixed(2);
		cuotaFrances.setCapital = (cuotaFija - cuotaFrances.getInteres).toFixed(2);
		cuotaFrances.setTotal = (
			Number(cuotaFrances.getCapital) +
			Number(cuotaFrances.getInteres) +
			Number(cuotaFrances._iva) +
			Number(cuotaFrances._comiAdm)
		).toFixed(2);

		cuota.push(cuotaFrances);
		prestamo -= cuotaFrances.getCapital;
	}

	return cuota;
}

function calcularCuotaAleman(prestamo, plazo, interes, iva, comisionAdm) {
	const cuota = [];

	let cuotaFija = prestamo / plazo;
	do {
		const cuotaAleman = new CuotaMensual();
		cuotaAleman.setCapital = cuotaFija.toFixed(2);
		cuotaAleman.setInteres = ((prestamo * interes) / 100).toFixed(2);
		cuotaAleman.setIva = (cuotaAleman.getCapital * iva).toFixed(2);
		cuotaAleman.setComisionAdm = (cuotaAleman.getCapital * comisionAdm).toFixed(
			2
		);
		cuotaAleman.setSistema = "ALEMAN";
		cuotaAleman.setTotal = (
			Number(cuotaAleman.getCapital) +
			Number(cuotaAleman.getInteres) +
			Number(cuotaAleman.getIva) +
			Number(cuotaAleman.getComisionAdm)
		).toFixed(2);

		cuota.push(cuotaAleman);
		prestamo -= cuotaFija;
	} while (prestamo > 0);

	return cuota;
}
