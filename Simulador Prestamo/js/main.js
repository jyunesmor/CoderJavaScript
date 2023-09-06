alert("Hola Bienvenido al Simulador de Prestamos");

console.log("Hola Bienvenido al Simulador de Prestamos");

// Solicitud de Datos
let prestamo = Number(prompt("Ingrese el Monto del Prestamo a Solicitar"));
let cantCuotas = Number(prompt("Ingrese el plazo en el cual se devolvera"));

// Tasa de Interes
const tasaInteres = Number(
   prompt("Ingrese Tasa de Interes a Aplicar Mensualmente")
);

// Eleccion tipo de Amortizacion
const sistema = prompt(
   "Ingrese el Sistema de Amorizacion (Aleman, Frances o Americano)"
);

switch (sistema.toLowerCase()) {
   case "aleman":
      let arrayAle = valorCuotaAleman(prestamo, cantCuotas, tasaInteres);
      console.log(
         "El detalle de Cuotas e Importe para su prestamos de amortizacion Aleman es: "
      );
      console.log(arrayAle);
      break;
   case "frances":
      let arrayFran = valorCuotaFrances(prestamo, cantCuotas, tasaInteres);
      console.log(
         "El detalle de Cuotas e Importe para su prestamos de amortizacion Frances es: "
      );
      console.log(arrayFran);
      break;
   case "americano":
      let arrayAme = valorCuotaAmericano(prestamo, cantCuotas, tasaInteres);
      console.log(
         "El detalle de Cuotas para su prestamos de amortizacion Americano es: "
      );
      console.log(arrayAme);
      break;
   default:
      break;
}

// Funciones a utiizar

function cuotaMensual(capital, interes, total) {
   this.capital = capital;
   this.interes = interes;
   this.total = total;
}

function valorCuotaAmericano(a, b, c) {
   const arrayCuota = [];

   let mes = 1;
   const cuotaFija = (a * c) / 100;
   const saldo = a;
   let totAmericano = cuotaFija + saldo;
   console.log(totAmericano);

   while (mes <= b) {
      if (mes === b) {
         let cuota = new cuotaMensual(saldo, cuotaFija, totAmericano);
         arrayCuota.push(cuota);
      } else {
         let cuota = new cuotaMensual(0, cuotaFija, cuotaFija);
         arrayCuota.push(cuota);
      }

      mes += 1;
   }

   return arrayCuota;
}

function valorCuotaFrances(a, b, c) {
   const arrayCuota = [];

   // Calculo Cuota Fija Mensual
   let intParc = c / 100;
   let d = 1 + intParc;

   let prestInt = a * intParc;
   let divisor = 1 - Math.pow(d, -b);

   const cuotaFija = prestInt / divisor;

   // Calculo Desglose de Cuota
   let prest = a;

   while (prest > 1) {
      let intcuot = prest * intParc; // calculo Interes cuota
      let amort = cuotaFija - intcuot; // calculo capital amortizado
      let g = intcuot + amort; // calculo total cuota mensual
      let cuotot = g.toFixed(2);

      let cuota = new cuotaMensual(
         amort.toFixed(2),
         intcuot.toFixed(2),
         cuotot
      );

      arrayCuota.push(cuota);

      prest -= amort;
   }

   return arrayCuota;
}

function valorCuotaAleman(a, b, c) {
   const arrayCuota = [];

   const cuotaFija = a / b;

   let prest = a;

   do {
      let intParc = (prest * c) / 100;

      let g = cuotaFija + intParc;
      let cuotaParc = g.toFixed(2);

      let cuota = new cuotaMensual(cuotaFija, intParc, cuotaParc);

      arrayCuota.push(cuota);

      prest -= cuotaFija;
   } while (prest > 0);

   return arrayCuota;
}
