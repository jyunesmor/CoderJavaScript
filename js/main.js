alert("Hola Bienvenido al Simulador de Prestamos");
console.log("Hola Bienvenido al Simulador de Prestamos");

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

let dineroSolicitado = prompt("Ingrese el Importe de Prestamo a Solicitar");
let prestamo = verificarNumero(dineroSolicitado);

let cantCuotas = prompt("Ingrese el plazo en el cual se devolvera");
let plazo = verificarNumero(cantCuotas);

let tasaInteres = prompt(
  "Ingrese Tasa de Interes a Aplicar Mensualmente"
).toLowerCase();
let interes = verificarNumero(tasaInteres);

//Gastos Fijos
const iva = 0.21; // 21%
const comisionAdm = 0.05; // 5%

let sistema = "";

do {
  let amortizacion = prompt(
    "Ingrese Sistema de Amorizacion (Aleman, Frances o Americano)"
  );
  sistema = verificarSistema(amortizacion);
  const cuota = new CuotaMensual();

  switch (sistema.toLowerCase()) {
    case "aleman":
      const cuotaAlemana = calcularCuotaAleman(
        prestamo,
        plazo,
        interes,
        iva,
        comisionAdm
      );
      console.log(
        "El detalle de Cuotas e Importe para su prestamos de amortizacion Aleman es: "
      );

      cuota.mostrarCuotas(cuotaAlemana);
      break;
    case "frances":
      const cuotaFrances = calcularCuotaFrances(
        prestamo,
        plazo,
        interes,
        iva,
        comisionAdm
      );
      console.log(
        "El detalle de Cuotas e Importe para su prestamos de amortizacion Frances es: "
      );
      cuota.mostrarCuotas(cuotaFrances);
      break;
    case "americano":
      const cuotaAmericana = calcularCuotaAmericano(
        prestamo,
        plazo,
        interes,
        iva,
        comisionAdm
      );
      console.log(
        "El detalle de Cuotas e Importe para su prestamos de amortizacion Americano es: "
      );

      cuota.mostrarCuotas(cuotaAmericana);
      break;
    default:
      console.log("No ingreso una opcion valida");
  }
} while (sistema == "");

// Funciones a utiizar

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
    cuotaAleman.setCapital = cuotaFija;
    cuotaAleman.setInteres = (prestamo * interes) / 100;
    cuotaAleman._iva = (cuotaAleman.getCapital * iva).toFixed(2);
    cuotaAleman._comiAdm = (cuotaAleman.getCapital * comisionAdm).toFixed(2);
    cuotaAleman._sistema = "ALEMAN";
    cuotaAleman._total = (Number(cuotaAleman.getCapital) + Number(cuotaAleman.getInteres) + Number(cuotaAleman._iva) + Number(cuotaAleman._comiAdm)).toFixed(2);

    cuota.push(cuotaAleman);
    prestamo -= cuotaFija;
  } while (prestamo > 0);

  return cuota;
} // Sistema Cuota Variable
