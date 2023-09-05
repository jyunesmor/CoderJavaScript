alert("Hola Bienvenido al Simulador de Prestamos");

console.log("Hola Bienvenido al Simulador de Prestamos");

// Solicitud de Datos
let prestamo = prompt("Ingrese el Monto del Prestamo a Solicitar");
let cantCuotas = prompt("Ingrese el plazo en el cual se devolvera");

// Tasa Fija
const tasaInteres = Number(
   prompt("Ingrese Tasa de Interes a Aplicar Mensualmente")
);

console.log("Sistema Aleman");
console.log(valorCuotaAleman(prestamo, cantCuotas, tasaInteres));
console.log("==========================");
console.log("Sistema Frances");
console.log(valorCuotaFrances(prestamo, cantCuotas, tasaInteres));
/* console.log("==========================");
console.log("Sistema Americano");
console.log(valorCuotaAmericano(prestamo, cantCuotas, tasaInteres));
 */
// Funciones a utiizar

function valorCuotaAmericano(a, b, c) {
   function CuotaFinal(capital, interes) {
      (this.capital = capital), (this.interes = interes);
   }

   let mes = 1;
   const cuotaFija = (a * c) / 100;
   const saldo = a;
   const arrayCuota = [];

   while (mes <= b) {
      if (mes === b) {
         let cuota = new CuotaFinal(saldo, cuotaFija);
         arrayCuota.push(cuota);
      } else {
         let cuota = new CuotaFinal(0, cuotaFija);
         arrayCuota.push(cuota);
      }

      mes += 1;
   }

   return arrayCuota;
}

function valorCuotaFrances(a, b, c) {
   const arrayCuota = [];

   /*    const cuotaFinal = {
      capital: a,
      interes: 0,
   }; */

   // Calculo Cuota Fija Mensual
   let intParc = c / 100;
   let d = 1 + intParc;

   let prestInt = a * intParc;
   let divisor = 1 - Math.pow(d, -b);

   const cuotaFija = prestInt / divisor;
   console.log("Valor Cuota " + cuotaFija.toFixed(2));

   // Calculo Desglose de Cuota
   let prest = a;

   while (prest > 1) {
      let intcuot = prest * intParc;
      console.log("Interes " + intcuot.toFixed(2));
      let amort = cuotaFija - intcuot;
      console.log("Capital " + amort.toFixed(2));

      let cuotaFinal = amort + intcuot;
      console.log("Cuota Total $ " + cuotaFinal.toFixed(2));

      arrayCuota.push(cuotaFinal.toFixed(2));

      prest -= amort;
      console.log("Deuda Actualizada " + prest.toFixed(2));
   }

   return arrayCuota;
}

function valorCuotaAleman(a, b, c) {
   const arrayCuota = [];

   const cuotaFija = a / b;
   console.log(cuotaFija);

   let prest = a;
   console.log(prest);

   do {
      let intParc = (prest * c) / 100;
      console.log(intParc);

      let cuotaParc = cuotaFija + intParc;

      arrayCuota.push(cuotaParc.toFixed(2));

      prest -= cuotaFija;
      console.log("Deuda Actualizada " + prest.toFixed(2));
   } while (prest > 0);

   return arrayCuota;
}
