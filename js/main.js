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
   prompt("Ingrese Tasa de Interes a Aplicar Mensualmente").toLowerCase()
);

//Gastos Fijos
const iva = 0.21; // 21%
const comisionAdm = 0.05; // 5%

let sistema = "";

do {
   // Eleccion tipo de Amortizacion
   sistema = verificarSistema(
      prompt("Ingrese Sistema de Amorizacion (Aleman, Frances o Americano)")
   );

   switch (sistema.toLowerCase()) {
      case "aleman":
         let arrayAle = valorCuotaAleman(
            prestamo,
            cantCuotas,
            tasaInteres,
            iva,
            comisionAdm
         );
         console.log(
            "El detalle de Cuotas e Importe para su prestamos de amortizacion Aleman es: "
         );

         mostrarCuotas(arrayAle);
         break;
      case "frances":
         let arrayFran = valorCuotaFrances(
            prestamo,
            cantCuotas,
            tasaInteres,
            iva,
            comisionAdm
         );
         console.log(
            "El detalle de Cuotas e Importe para su prestamos de amortizacion Frances es: "
         );
         mostrarCuotas(arrayFran);
         break;
      case "americano":
         let arrayAme = valorCuotaAmericano(
            prestamo,
            cantCuotas,
            tasaInteres,
            iva,
            comisionAdm
         );
         console.log(
            "El detalle de Cuotas e Importe para su prestamos de amortizacion Americano es: "
         );

         mostrarCuotas(arrayAme);
         break;
      default:
         console.log("No ingreso una opcion valida");
   }
} while (sistema == "");

// Funciones a utiizar

/**  Procesado de datos  */

function mostrarCuotas(cuotas) {
   cuotas.forEach((cuotas, i) => {
      console.log(
         `La Cuota n° ${i + 1}
         es por un total de $ ${cuotas.total}, 
         y se compone de la siguiente manera:
         Capital por $ ${cuotas.capital},
         Intereses por $ ${cuotas.interes},
         Iva por $ ${cuotas.iva},
         Comision Administrativa por $ ${cuotas.comiAdm}.-`
      );
      alert(`La Cuota n° ${i + 1}
         es por un total de $ ${cuotas.total}, el sistema elegido es el ${
         cuotas.sistema
      }.-`);
   });
}

/**   Verificación de Datos */

function verificarSistema(sistema) {
   while (
      sistema != "aleman" &&
      sistema != "frances" &&
      sistema != "americano"
   ) {
      sistema = prompt(
         "El sistema ingresado no es correcto, por favor reingrese un mismo"
      ).toLowerCase();
   }
   return sistema;
}

function verificarNumero(numero) {
   while (isNaN(numero)) {
      do {
         numero = prompt(
            "el importe Ingresado no es un número, por favor reingrese un valor"
         );
      } while (isNaN(numero));
   }
   return Number(numero);
}

/**  Creación de Cuotas y Usuario */

function CuotaMensual(capital, interes, total, iva, comiAdm, sistema) {
   this.capital = capital;
   this.interes = interes;
   this.total = total;
   this.iva = iva;
   this.comiAdm = comiAdm;
   this.sistema = sistema;
}

function Usuario(nombre, apellido, dni, sexo, mail, prestamo) {
   this.nombre = nombre;
   this.apellido = apellido;
   this.dni = dni;
   this.sexo = sexo;
   this.mail = mail;
   this.prestamo = prestamo;
}

/**  Cálculo de las cuotas */

function valorCuotaAmericano(prestamo, plazo, interes, iva, comisionAdm) {
   const arrayCuota = [];

   let mes = 1;
   let interesCuota = (prestamo * interes) / 100;
   let ivaCuota = prestamo * iva;
   let comisionAdmin = prestamo * comisionAdm;

   let cuotaFija = interesCuota + ivaCuota + comisionAdmin;
   let totAmericano = cuotaFija + prestamo;

   while (mes <= plazo) {
      if (mes === plazo) {
         let cuota = new CuotaMensual(
            prestamo.toFixed(2),
            cuotaFija.toFixed(2),
            totAmericano.toFixed(2),
            ivaCuota.toFixed(2),
            comisionAdmin.toFixed(2),
            "americano"
         );

         arrayCuota.push(cuota);
      } else {
         let cuota = new CuotaMensual(
            0,
            interesCuota.toFixed(2),
            cuotaFija.toFixed(2),
            ivaCuota.toFixed(2),
            comisionAdmin.toFixed(2),
            "americano"
         );

         arrayCuota.push(cuota);
      }

      mes += 1;
   }

   return arrayCuota;
} // Sistema Cuota Mixta

function valorCuotaFrances(prestamo, plazo, interes, iva, comisionAdm) {
   const arrayCuota = [];

   // Calculo Cuota Fija Mensual
   let intParc = interes / 100;
   let interesMasUno = 1 + intParc;

   let prestInt = prestamo * intParc;
   let divisor = 1 - Math.pow(interesMasUno, -plazo);

   let cuotaFija = prestInt / divisor;

   let ivaCuota = cuotaFija * iva;
   let comAdmCuota = cuotaFija * comisionAdm;

   // Calculo Desglose de Cuota
   let prest = prestamo;

   while (prest > 1) {
      let intcuot = prest * intParc; // calculo Interes cuota
      let amort = cuotaFija - intcuot; // calculo capital amortizado
      let cuotaMensual = intcuot + amort + ivaCuota + comAdmCuota; // calculo total cuota mensual
      let cuotot = cuotaMensual.toFixed(2);

      let cuota = new CuotaMensual(
         amort.toFixed(2),
         intcuot.toFixed(2),
         cuotot,
         ivaCuota.toFixed(2),
         comAdmCuota.toFixed(2),
         "frances"
      );

      arrayCuota.push(cuota);

      prest -= amort;
   }

   return arrayCuota;
} // Sistema Cuota Fijo

function valorCuotaAleman(prestamo, plazo, interes, iva, comisionAdm) {
   const arrayCuota = [];

   const cuotaFija = prestamo / plazo;

   let ivaCuota = cuotaFija * iva;
   let comAdmCuota = cuotaFija * comisionAdm;

   let prest = prestamo;

   do {
      let intParc = (prest * interes) / 100;

      let cuotaMensual = cuotaFija + intParc + ivaCuota + comAdmCuota;

      let cuota = new CuotaMensual(
         cuotaFija.toFixed(2),
         intParc.toFixed(2),
         cuotaMensual.toFixed(2),
         ivaCuota.toFixed(2),
         comAdmCuota.toFixed(2),
         "aleman"
      );

      arrayCuota.push(cuota);

      prest -= cuotaFija;
   } while (prest > 0);

   return arrayCuota;
} // Sistema Cuota Variable
