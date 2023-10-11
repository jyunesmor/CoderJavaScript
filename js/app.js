const simularPrestamo = document.querySelector("#consultaPrest");
const solicitarPrest = document.querySelector("#solicitarPrest");
const periodo = document.querySelector("#plazo");
const amortizacion = document.querySelector("#sistema");
const importe = document.querySelector("#solicitud");
const panelPrestamo = document.querySelector(".panelPrestamo");
const buscadorPrestamos = document.querySelector("#buscadorPrestamos");

const tipoBusqueda = document.querySelector("#tipoBusqueda");
/* const inputSearch = document.querySelector('#inputSearch'); */
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const dni = document.querySelector("#documento");
const email = document.querySelector("#email");

const respuestaSimulacion = document.querySelector(
   "#respuestaSimulacion tbody"
);
const respuestaSimulacionInfo = document.querySelector(
   "#respuestaSimulacion p"
);
const respuestaBusqueda = document.querySelector("#respuestaBusqueda tbody");

const btnSolicitar = document.querySelector("#btnSolicitar");
const btnSimular = document.querySelector("#btnSimular");
const btnSolicitarPrest = document.querySelector("#btnSolicitarPrest");

const btnBuscar = document.querySelector("#btnBuscar");

btnBuscar.addEventListener("submit", (evt) => {
   evt.preventDefault();
   let prestamosEncontrados = [];

   const { value: categoria } = Swal.fire({
      title: "¿ Selecciona el tipo de Busqueda ?",
      input: "select",
      inputOptions: {
         Sistemas: {
            aleman: "Alemán",
            frances: "Fránces",
            americano: "Americano",
         },
      },
      inputPlaceholder: "Categoria",
      showCancelButton: true,
      inputValidator: (value) => {
         return new Promise((resolve) => {
            if (
               value === "aleman" &&
               value === "frances" &&
               value === "americano"
            ) {
               resolve();
            } else {
               resolve("Debe seleccionar Alemán, Fránces, o Americano");
            }
         });
      },
   });

   if (categoria) {
      Swal.fire(`You selected: ${fruit}`);
   }
});

class CuotaMensual {
   constructor(capital, interes, total, iva, comisionadm, sistema) {
      this._capital = capital;
      this._interes = interes;
      this._total = total;
      this._iva = iva;
      this._comiAdm = comisionadm;
      this._sistema = sistema;
      this._totalPrestamo = null;
   }

   get getCapital() {
      return this._capital;
   }

   get getInteres() {
      return this._interes;
   }

   get getTotal() {
      return this._total;
   }

   get getIva() {
      return this._iva;
   }

   get getComisionAdm() {
      return this._comiAdm;
   }

   get getSistema() {
      return this._sistema;
   }

   set setCapital(cap) {
      this._capital = cap;
   }

   set setInteres(int) {
      this._interes = int;
   }

   set setTotal(tot) {
      this._total = tot;
   }

   set setIva(iv) {
      this._iva = iv;
   }

   set setComisionAdm(com) {
      this._comiAdm = com;
   }

   set setSistema(sist) {
      this._sistema = sist;
   }
}

class Usuario {
   constructor(nombre, apellido, dni, email, prestamo) {
      this._nombre = nombre;
      this._apellido = apellido;
      this._dni = dni;
      this._email = email;
      this._prestamo = prestamo;
      this._totalPrestamo = 0;
   }

   get getNombre() {
      return this._nombre;
   }

   get getApellido() {
      return this.apellido;
   }

   get getDni() {
      return this._dni;
   }

   get getEmail() {
      return this._email;
   }

   get getPrestamo() {
      return this._prestamo;
   }

   get getTotalPrestamo() {
      return this._totalPrestamo;
   }

   set setTotalPrestamo(totprest) {
      this._totalPrestamo = totprest;
   }

   set setNombre(nom) {
      this._nombre = nom;
   }

   set setApellido(ape) {
      this._apellido = ape;
   }

   set setDni(documento) {
      this._dni = documento;
   }

   set setEmail(mail) {
      this._email = mail;
   }

   set setPrestamo(prest) {
      this._prestamo = prest;
   }
}

let cuota = new CuotaMensual();
// Eventos

simularPrestamo.addEventListener("submit", (evt) => {
   evt.preventDefault();

   //Gastos Fijos
   const iva = 0.21; // 21%
   const comisionAdm = 0.05; // 5%
   const interes = 0.1; // 10%

   if (amortizacion.value === "aleman") {
      cuota = calcularCuotaAleman(
         Number(importe.value),
         Number(periodo.value),
         interes,
         iva,
         comisionAdm
      );
   } else if (amortizacion.value === "frances") {
      cuota = calcularCuotaFrances(
         Number(importe.value),
         Number(periodo.value),
         interes,
         iva,
         comisionAdm
      );
   } else {
      cuota = calcularCuotaAmericano(
         Number(importe.value),
         Number(periodo.value),
         interes,
         iva,
         comisionAdm
      );
   }

   cargarTablaCuota(cuota);
   cargaDetalle();

   btnSimular.textContent = "Volver a Simular";

   cuota === null
      ? (btnSolicitar.disabled = true)
      : (btnSolicitar.disabled = false);
});

btnSolicitar.addEventListener("click", (evt) => {
   evt.preventDefault();

   panelPrestamo.style.display = "block";
   btnSolicitar.style.display = "none";
});

solicitarPrest.addEventListener("submit", (evt) => {
   evt.preventDefault();
   let usuario = new Usuario();
   let us = [];
   let db = [];

   usuario.setNombre = nombre.value;
   usuario.setApellido = apellido.value;
   usuario.setDni = dni.value;
   usuario.setEmail = email.value;
   usuario.setPrestamo = cuota;
   usuario.setTotalPrestamo =
      (usuario._prestamo
         .reduce((acumulador, cuota) => (acumulador += Number(cuota._total)))
         .toFixed(2),
         0);

   us.push(usuario);
   db = JSON.parse(localStorage.getItem("usuario"));

   Swal.fire({
      title: "Confirmas la solicitud del Prestamo?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Solicitar",
      denyButtonText: `Cancelar la Solicitud`,
   }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
         Swal.fire(
            "Felicidades!",
            usuario.getNombre.toUpperCase(),
            ", en unos momentos, lo veras acreditado"
         );

         if (db === null) {
            localStorage.setItem("usuario", JSON.stringify(us));
         } else {
            db.push(usuario);
            localStorage.setItem("usuario", JSON.stringify(db));
         }
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

btnBuscar.addEventListener("click", (evt) => {
   evt.preventDefault();
   let prestamosEncontrados = [];

   (async () => {
      const { value: tipoBusq } = Swal.fire({
         title: "¿ Selecciona el tipo de Busqueda ?",
         input: "select",
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
                                    prestamosEncontrados =
                                       filtrarPorDocumento(dni);
                                    cargarTablaBusqueda(prestamosEncontrados);
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
                                    resolve();
                                    console.log(sistema);
                                    let ssut = sistema.toUpperCase();
                                    console.log(ssut);
                                    prestamosEncontrados =
                                       filtrarPorSistema(ssut);
                                    console.log(prestamosEncontrados);
                                    cargarTablaBusqueda(prestamosEncontrados);
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
                                    prestamosEncontrados =
                                       filtrarPorNombre(nombre);
                                    cargarTablaBusqueda(prestamosEncontrados);
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
                  resolve("Debe seleccionar una opción Válida");
               }
            });
         },
      });
   })();
});

// Funciones a utiizar

function filtrarPorDocumento(documento) {
   let dbPrestamos = [];
   dbPrestamos = JSON.parse(localStorage.getItem("usuario"));
   return (prestamoFiltrado = dbPrestamos.filter(
      (usuario) => usuario._dni === documento
   ));
}

function filtrarPorSistema(sistema) {
   let dbPrestamos = [];
   dbPrestamos = JSON.parse(localStorage.getItem("usuario"));
   console.log(dbPrestamos);
   return dbPrestamos.filter((usuario) =>
      usuario._prestamo.some((prestamo) => prestamo._sistema === sistema)
   );
}

function filtrarPorNombre(nombre) {
   let dbPrestamos = [];
   dbPrestamos = JSON.parse(localStorage.getItem("usuario"));
   return (prestamoFiltrado = dbPrestamos.filter(
      (usuario) => usuario._nombre === nombre
   ));
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
         <td> ${usuario._email} </td>
         <td> ${sistema._sistema} </td>
         <td>$ ${usuario._totalPrestamo} </td>
      `;
      respuestaBusqueda.appendChild(fila);
   });
}

function cargaDetalle() {
   limpiarInfo();
   const filaInfo = document.createElement("span");
   filaInfo.innerHTML = `
      * Los Valores de Cuota incluyen IVA (21%), Comisión Administrativa (5%), y Tasa de Interes del 10%.-
   `;
   respuestaSimulacionInfo.appendChild(filaInfo);
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
      respuestaSimulacion.appendChild(fila);
   });
}

function cargaDetalle() {
   limpiarInfo();
   const filaInfo = document.createElement("span");
   filaInfo.innerHTML = `
      * Los Valores de Cuota incluyen IVA (21%), Comisión Administrativa (5%), y Tasa de Interes del 10%.-
   `;
   respuestaSimulacionInfo.appendChild(filaInfo);
}

function limpiarTablaBusqueda() {
   while (respuestaBusqueda.firstChild) {
      respuestaBusqueda.removeChild(respuestaBusqueda.firstChild);
   }
}

function limpiarTabla() {
   while (respuestaSimulacion.firstChild) {
      respuestaSimulacion.removeChild(respuestaSimulacion.firstChild);
   }
}

function limpiarInfo() {
   while (respuestaSimulacionInfo.firstChild) {
      respuestaSimulacionInfo.removeChild(respuestaSimulacionInfo.firstChild);
   }
}

/**  Cálculo de las cuotas */
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
} // Sistema Cuota Mixta

function calcularCuotaFrances(prestamo, plazo, interes, iva, comisionAdm) {
   const cuota = [];

   // Calculo Cuota Fija Mensual
   let cuotaFija =
      (prestamo * (interes / 100)) / (1 - Math.pow(interes / 100 + 1, -plazo));

   // Calculo Desglose de Cuota
   while (prestamo > 1) {
      const cuotaFrances = new CuotaMensual();
      cuotaFrances.setIva = (cuotaFija * iva).toFixed(2);
      cuotaFrances.setComisionAdm = (cuotaFija * comisionAdm).toFixed(2);
      cuotaFrances.setSistema = "FRANCES";
      cuotaFrances.setInteres = (prestamo * (interes / 100)).toFixed(2);
      cuotaFrances.setCapital = (cuotaFija - cuotaFrances.getInteres).toFixed(
         2
      );
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
} // Sistema Cuota Fijo

function calcularCuotaAleman(prestamo, plazo, interes, iva, comisionAdm) {
   const cuota = [];

   let cuotaFija = prestamo / plazo;
   do {
      const cuotaAleman = new CuotaMensual();
      cuotaAleman.setCapital = cuotaFija.toFixed(2);
      cuotaAleman.setInteres = ((prestamo * interes) / 100).toFixed(2);
      cuotaAleman.setIva = (cuotaAleman.getCapital * iva).toFixed(2);
      cuotaAleman.setComisionAdm = (
         cuotaAleman.getCapital * comisionAdm
      ).toFixed(2);
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
} // Sistema Cuota Variable
