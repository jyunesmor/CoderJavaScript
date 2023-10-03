
const simularPrestamo = document.querySelector("#consultaPrest");
const periodo = document.querySelector("#plazo");
const amortizacion = document.querySelector("#sistema");
const importe = document.querySelector("#solicitud");
const respuestaSimulacion = document.querySelector('#respuestaSimulacion tbody');
const respuestaSimulacionInfo = document.querySelector('#respuestaSimulacion p');

class CuotaMensual {
   constructor(capital, interes, total, iva, comiAdm, sistema) {
      this._capital = capital;
      this._interes = interes;
      this._total = total;
      this._iva = iva;
      this._comiAdm = comiAdm;
      this._sistema = sistema;
   }

   get getCapital() {
      return this._capital;
   }

   get getInteres() {
      return this._interes;
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

   set setIva(iv) {
      this._iva = iv;
   }

   set setComisionAdm(com) {
      this._comiAdm = com;
   }

   set setSistema(sist) {
      this._sistema = sist;
   }

   mostrarCuotas(cuotas) {
      cuotas.forEach((cuotas, i) => {
         console.log(
            `La Cuota n° ${i + 1}
            es por un total de $ ${cuotas._total}, 
            y se compone de la siguiente manera:
            Capital por $ ${cuotas._capital},
            Intereses por $ ${cuotas._interes},
            Iva por $ ${cuotas._iva},
            Comision Administrativa por $ ${cuotas._comiAdm}.-`
         );
      });
   }

}

let cuota = new CuotaMensual();

simularPrestamo.addEventListener("submit", (evt) => {

   evt.preventDefault();

   //Gastos Fijos
   const iva = 0.21; // 21%
   const comisionAdm = 0.05; // 5%
   const interes = 0.10; // 10%

   if (amortizacion.value === 'aleman') {
      cuota = calcularCuotaAleman(
         Number(importe.value),
         Number(periodo.value),
         interes,
         iva,
         comisionAdm
      );
   } else if (amortizacion.value === 'frances') {
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
});

// Funciones a utiizar


function cargarTablaCuota(plan) {

   limpiarTabla();
   plan.forEach((cuota, i) => {

      const fila = document.createElement('tr');

      fila.innerHTML = `
         <td class="centered"> ${i + 1} </td>
         <td class="centered"> $ ${cuota._total} *</td>
         <td class="centered"> $ ${cuota._capital} </td>
         <td class="centered"> $ ${cuota._interes} </td>
      `
      respuestaSimulacion.appendChild(fila);
   })

};

function cargaDetalle() {

   limpiarInfo();
   const filaInfo = document.createElement('span');
   filaInfo.innerHTML = `
      * Los Valores de Cuota incluyen IVA (21%), Comisión Administrativa (5%), y Tasa de Interes del 10%.-
   `
   respuestaSimulacionInfo.appendChild(filaInfo);

};

function limpiarTabla() {
   while (respuestaSimulacion.firstChild) {
      respuestaSimulacion.removeChild(respuestaSimulacion.firstChild);
   }
};

function limpiarInfo() {
   while (respuestaSimulacionInfo.firstChild) {
      respuestaSimulacionInfo.removeChild(respuestaSimulacionInfo.firstChild);
   }
};

/**  Cálculo de las cuotas */
function calcularCuotaAmericano(prestamo, plazo, interes, iva, comisionAdm) {
   const cuota = [];

   let mes = 1;
   while (mes <= plazo) {
      const cuotaAmericana = new CuotaMensual();
      cuotaAmericana._iva = prestamo * iva;
      cuotaAmericana._comiAdm = prestamo * comisionAdm;
      cuotaAmericana._sistema = "AMERICANO";
      cuotaAmericana.setInteres = ((prestamo * interes) / 100).toFixed(2);

      if (mes === plazo) {
         cuotaAmericana.setCapital = prestamo.toFixed(2);
         cuotaAmericana._total = (
            Number(cuotaAmericana.getInteres) +
            Number(cuotaAmericana.getIva) +
            Number(cuotaAmericana.getComisionAdm) +
            prestamo
         ).toFixed(2);
         cuota.push(cuotaAmericana);
      } else {
         cuotaAmericana.setCapital = 0;
         cuotaAmericana._total = (
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
      cuotaFrances._iva = (cuotaFija * iva).toFixed(2);
      cuotaFrances._comiAdm = (cuotaFija * comisionAdm).toFixed(2);
      cuotaFrances._sistema = "FRANCES";
      cuotaFrances.setInteres = (prestamo * (interes / 100)).toFixed(2);
      cuotaFrances.setCapital = (cuotaFija - cuotaFrances.getInteres).toFixed(
         2
      );
      cuotaFrances._total = (Number(cuotaFrances.getCapital) + Number(cuotaFrances.getInteres) + Number(cuotaFrances._iva) + Number(cuotaFrances._comiAdm)).toFixed(2);

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
      cuotaAleman._iva = (cuotaAleman.getCapital * iva).toFixed(2);
      cuotaAleman._comiAdm = (cuotaAleman.getCapital * comisionAdm).toFixed(2);
      cuotaAleman._sistema = "ALEMAN";
      cuotaAleman._total = (Number(cuotaAleman.getCapital) + Number(cuotaAleman.getInteres) + Number(cuotaAleman._iva) + Number(cuotaAleman._comiAdm)).toFixed(2);

      cuota.push(cuotaAleman);
      prestamo -= cuotaFija;
   } while (prestamo > 0);

   return cuota;
} // Sistema Cuota Variable








