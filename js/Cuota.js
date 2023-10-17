export class CuotaMensual {
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
