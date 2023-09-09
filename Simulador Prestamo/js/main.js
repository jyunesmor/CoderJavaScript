alert("Hola Bienvenido al Simulador de Prestamos");

console.log("Hola Bienvenido al Simulador de Prestamos");

// Solicitud de Datos
let prestamo = verificarNumero(
   prompt("Ingrese el Importe de Prestamo a Solicitar")
);

let cantCuotas = verificarNumero(
   prompt("Ingrese el plazo en el cual se devolvera")
);

let tasaInteres = verificarNumero(
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

function verificarNumero(numero) {
   while (isNaN(numero)) {
      do {
         numero = prompt(
            "el importe Ingresado no es un número, por favor reingrese un valor"
         );
      } while (isNaN(numero));
   }
   return numero;
}

function CuotaMensual(capital, interes, total) {
   this.capital = capital;
   this.interes = interes;
   this.total = total;
}

function valorCuotaAmericano(prestamo, plazo, interes) {
   const arrayCuota = [];

   let mes = 1;
   const cuotaFija = (prestamo * interes) / 100;
   const saldo = prestamo;
   let totAmericano = cuotaFija + saldo;
   console.log(totAmericano);

   while (mes <= plazo) {
      if (mes === plazo) {
         let cuota = new CuotaMensual(saldo, cuotaFija, totAmericano);
         arrayCuota.push(cuota);
      } else {
         let cuota = new CuotaMensual(0, cuotaFija, cuotaFija);
         arrayCuota.push(cuota);
      }

      mes += 1;
   }

   return arrayCuota;
}

function valorCuotaFrances(prestamo, plazo, interes) {
   const arrayCuota = [];

   // Calculo Cuota Fija Mensual
   let intParc = interes / 100;
   let interesMasUno = 1 + intParc;

   let prestInt = prestamo * intParc;
   let divisor = 1 - Math.pow(interesMasUno, -plazo);

   const cuotaFija = prestInt / divisor;

   // Calculo Desglose de Cuota
   let prest = prestamo;

   while (prest > 1) {
      let intcuot = prest * intParc; // calculo Interes cuota
      let amort = cuotaFija - intcuot; // calculo capital amortizado
      let cuotaMensual = intcuot + amort; // calculo total cuota mensual
      let cuotot = cuotaMensual.toFixed(2);

      let cuota = new CuotaMensual(
         amort.toFixed(2),
         intcuot.toFixed(2),
         cuotot
      );

      arrayCuota.push(cuota);

      prest -= amort;
   }

   return arrayCuota;
}

function valorCuotaAleman(prestamo, plazo, interes) {
   const arrayCuota = [];

   const cuotaFija = prestamo / plazo;

   let prest = prestamo;

   do {
      let intParc = (prest * interes) / 100;

      let cuotaMensual = cuotaFija + intParc;
      let cuotaParc = cuotaMensual.toFixed(2);

      let cuota = new CuotaMensual(cuotaFija, intParc, cuotaParc);

      arrayCuota.push(cuota);

      prest -= cuotaFija;
   } while (prest > 0);

   return arrayCuota;
}
