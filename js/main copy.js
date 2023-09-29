/**  Creación de Cuotas y Usuario */

class CuotaMensual {
   constructor(capital, interes, total, iva, comiAdm, sistema) {
      this.capital = capital;
      this.interes = interes;
      this.total = total;
      this.iva = iva;
      this.comiAdm = comiAdm;
      this.sistema = sistema;
   }

   mostrarCuotas(cuotas) {
      cuotas.forEach((cuotas, i) => {
         console.log(
            `La Cuota n° ${i + 1}
         es por un total de $ ${cuotas.this.total}, 
         y se compone de la siguiente manera:
         Capital por $ ${cuotas.this.capital},
         Intereses por $ ${cuotas.this.interes},
         Iva por $ ${cuotas.this.iva},
         Comision Administrativa por $ ${cuotas.this.comiAdm}.-`
         );
         alert(`La Cuota n° ${i + 1}
         es por un total de $ ${cuotas.this.total}, el sistema elegido es el ${
            cuotas.this.sistema
         } .-`);
      });
   }
}
