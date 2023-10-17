export class Usuario {
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
