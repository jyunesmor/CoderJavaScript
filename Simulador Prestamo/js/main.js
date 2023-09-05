alert("Hola Bienvenido al Simulador de Prestamos");

console.log("Hola Bienvenido al Simulador de Prestamos");

// Solicitud de Datos
let prestamo = prompt("Ingrese el Monto del Prestamo a Solicitar");
let cantCuotas = prompt("Ingrese el plazo en el cual se devolvera");

// Tasa Fija
const tasaInteres = Number(
   prompt("Ingrese Tasa de Interes a Aplicar Mensualmente")
);

console.log(valorCuota(prestamo, cantCuotas, tasaInteres));

// Funciones a utiizar

function valorCuota(a, b, c) {
   const arrayCuota = [];

   const cuotaFinal = {
      capital: a,
      interes: 0,
   };

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
      console.log(intcuot.toFixed(2));
      let amort = cuotaFija - intcuot;
      console.log(amort.toFixed(2));

      cuotaFinal.capital = amort.toFixed(2);
      cuotaFinal.interes = intcuot.toFixed(2);

      arrayCuota.push(cuotaFinal);

      prest -= amort;
      console.log("Deuda Actualizada " + prest.toFixed(2));
   }

   return arrayCuota;
}

/* function valorCuotaAleman(a, b, c) {
   const arrayCuota = [];

   const cuotaFija = a / b;
   console.log(cuotaFija);

   let prest = a;
   console.log(prest);

   do {
      let intParc = (prest * c) / 100;
      console.log(intParc);

      let cuotaParc = cuotaFija + intParc;

      arrayCuota.push(cuotaParc);

      prest -= cuotaFija;
   } while (prest > 0);

   return arrayCuota;
}
 */
