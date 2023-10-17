import { CuotaMensual } from "./Cuota.js";
import { Usuario } from "./Usuario.js";
import { datos, botones, dom } from "./dom.js";
import { filtros, calculo, tablas } from "./funciones.js";

const url =
	"https://api.openweathermap.org/data/2.5/weather?q=cordoba&appid=7a347669d65ddf36ab4d0a291c760d6c";

fetch(url)
	.then((response) => response.json())
	.then((data) => console.log(data));

let cuota = new CuotaMensual();

dom.consultaPrest.addEventListener("submit", (evt) => {
	evt.preventDefault();

	const iva = 0.21;
	const comisionAdm = 0.05;
	const interes = 0.1;

	if (datos.amortizacion.value === "aleman") {
		cuota = calculo.calcularCuotaAleman(
			Number(datos.importe.value),
			Number(datos.periodo.value),
			interes,
			iva,
			comisionAdm
		);
	} else if (datos.amortizacion.value === "frances") {
		cuota = calculo.calcularCuotaFrances(
			Number(datos.importe.value),
			Number(datos.periodo.value),
			interes,
			iva,
			comisionAdm
		);
	} else {
		cuota = calculo.calcularCuotaAmericano(
			Number(datos.importe.value),
			Number(datos.periodo.value),
			interes,
			iva,
			comisionAdm
		);
	}

	tablas.cargarTablaCuota(cuota);
	tablas.cargaDetalle();

	btnSimular.textContent = "Volver a Simular";

	cuota === null
		? (btnSolicitar.disabled = true)
		: (btnSolicitar.disabled = false);
});

botones.btnSolicitar.addEventListener("click", (evt) => {
	evt.preventDefault();

	dom.panelPrestamo.style.display = "block";
	botones.btnSolicitar.style.display = "none";
});

dom.solicitarPrest.addEventListener("submit", (evt) => {
	evt.preventDefault();
	let usuario = new Usuario();
	let us = [];
	let db = [];

	usuario.setNombre = datos.nombre.value.toUpperCase();
	usuario.setApellido = datos.apellido.value.toUpperCase();
	usuario.setDni = datos.dni.value;
	usuario.setEmail = datos.email.value;
	usuario.setPrestamo = cuota;
	let totalPrest = usuario._prestamo.reduce(
		(acumulador, cuota) => (acumulador += Number(cuota._total)),
		0
	);
	usuario.setTotalPrestamo = totalPrest.toFixed(2);

	us.push(usuario);
	db = JSON.parse(localStorage.getItem("usuario"));

	Swal.fire({
		title: "Confirmas la solicitud del Prestamo?",
		showDenyButton: true,
		showCancelButton: true,
		confirmButtonText: "Solicitar",
		denyButtonText: `Cancelar la Solicitud`,
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire(
				`Felicidades!,
            ${usuario.getNombre}, en unos momentos, lo veras acreditado`
			);

			db === null
				? localStorage.setItem("usuario", JSON.stringify(us))
				: db.push(usuario);

			localStorage.setItem("usuario", JSON.stringify(db));
			location.reload();
		} else if (result.isDenied) {
			Swal.fire(
				usuario.getNombre.toUpperCase(),
				"Se cancelo correctamente, gracias y te esperamos nuevamente "
			);
			location.reload();
		}
	});
});

botones.btnBuscar.addEventListener("click", (evt) => {
	evt.preventDefault();
	let prestamosEncontrados = [];

	(async () => {
		const { value: tipoBusq } = await Swal.fire({
			title: "¿ Selecciona el tipo de Busqueda ?",
			input: "select",
			customClass: {
				popup: "ventanaClass",
			},
			allowOutsideClick: false,
			allowEscapeKey: false,
			allowEnterKey: false,
			stopKeydownPropagation: true,
			inputOptions: {
				dni: "Documento de Identidad",
				sistema: "Sistema de amortización",
				nombre: "Nombre Completo",
			},
			inputPlaceholder: "Categoria",
			showCancelButton: true,
			inputValidator: (tipoBusq) => {
				return new Promise((resolve) => {
					if (
						tipoBusq === "dni" ||
						tipoBusq === "sistema" ||
						tipoBusq === "nombre"
					) {
						resolve();
						switch (tipoBusq) {
							case "dni":
								Swal.fire({
									title: "Busqueda por Documento de Identidad",
									input: "text",
									inputLabel: "Documento de Identidad",
									inputPlaceholder: "Ingrese el Documento a Buscar",
									inputValidator: (dni) => {
										return new Promise((resolve) => {
											if (dni !== null) {
												prestamosEncontrados = filtros.filtrarPorDocumento(dni);
												tablas.cargarTablaTitulo();
												tablas.cargarTablaBusqueda(prestamosEncontrados);
												resolve();
											}
										});
									},
								});
								break;
							case "sistema":
								Swal.fire({
									title: "Busqueda por Sistema de Amortización",
									input: "select",
									inputOptions: {
										ALEMAN: "Alemán",
										FRANCES: "Francés",
										AMERICANO: "Americano",
									},
									inputPlaceholder: "Categoria",
									inputValidator: (sistema) => {
										return new Promise((resolve) => {
											if (sistema !== null) {
												let ssut = sistema.toUpperCase();
												prestamosEncontrados = filtros.filtrarPorSistema(ssut);
												tablas.cargarTablaTitulo();
												tablas.cargarTablaBusqueda(prestamosEncontrados);
												resolve();
											}
										});
									},
								});
								break;
							case "nombre":
								Swal.fire({
									title: "Busqueda por Nombre Completo",
									input: "text",
									inputLabel: "Nombre Completo",
									inputPlaceholder: "Ingrese el Nombre a Buscar",
									inputValidator: (nombre) => {
										return new Promise((resolve) => {
											if (nombre !== null) {
												prestamosEncontrados = filtros.filtrarPorNombre(nombre);
												tablas.cargarTablaTitulo();
												tablas.cargarTablaBusqueda(prestamosEncontrados);
												resolve();
											}
										});
									},
								});
								break;
							default:
								break;
						}
					} else {
					}
				});
			},
		});
	})();
	botones.btnCancelarBusqueda.style.display = "block";
});

botones.btnCancelarBusqueda.addEventListener("click", (evt) => {
	evt.preventDefault();
	location.reload();
});
