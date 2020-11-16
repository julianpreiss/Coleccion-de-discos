'use strict';

/*
 *	PREISS, JULIAN
 */

// Discos:
let aDiscos = [];

function Disco(
	nombre = 'Nombre del disco',
	autor = 'Autor del disco',
	codigo = 0,
	Pistas = [],
	) {


	this.Pistas = Pistas;

	//Pido nombre de disco
	this.PedirNombre = () => {
		do {
			nombre = prompt('Ingrese el nombre del album');

			if(!isNaN(nombre) || (nombre == 'Nombre del disco')){
				alert('Ingresaste un dato no válido')
			}

		} while (!isNaN(nombre) || (nombre == 'Nombre del disco'));
		this.nombre = nombre;
	}

	this.DarNombreDisco = () => this.nombre;

	//Pido autor
	this.PedirAutor = () => {
		do {
			autor = prompt('Ingrese el nombre del autor');

			if(!isNaN(autor) || (autor == 'Autor del disco')){
				alert('Ingresaste un dato no válido')
			}

		} while (!isNaN(autor) || autor == 'Autor del disco');
		this.autor = autor;
	}

	//Armo el setter de codigo junto con el validador

	let validadorcodigo = false;

	this.PedirCodigo = function () {
		do {
			codigo = parseInt(prompt('Ingrese el código numérico del disco'));
			for (let disco of aDiscos) {
				if (disco.DarCodigo() === codigo) {
					validadorcodigo = true
					break;
				} else {
					validadorcodigo = false
				}
			}

			if (validadorcodigo) {
				alert(`El codigo ${codigo} ya fue ingresado. Ingrese un codigo distinto por favor`)
			}

			if (isNaN(codigo)) {
				alert('Ingresaste un dato no válido')
			}

			if(codigo<1 || codigo>999) {
				alert('Dato erroneo, el codigo de disco debe ser un numero entre 1 y 999')				
			}
		}while(validadorcodigo == true || isNaN(codigo) || codigo<1 || codigo>999);
		this.codigo = codigo;
	}

	//Armo el getter, que funciona en conjunto

	this.DarCodigo = () => codigo;

	//Funcion para pushear los datos de cada pista
	this.GuardarPista = (pista) => {
		Pistas.push(pista);
	}

    this.DuracionDisco = () => {


		let duracion = 0;

		//Recorro:
		for (let pista of Pistas) {
			duracion += pista.duracion;
		}

		return duracion;
	}


    this.DiscoMasLargo = () => {

		let max = 0;
		let nombreDisco;
		let contador = 0;
		for (let disco of aDiscos) {
			if (contador == 0) {
				max = disco.DuracionDisco();
				nombreDisco = disco.DarNombreDisco();

			} else if (disco.DuracionDisco() > max) {
				max = disco.DuracionDisco();
				nombreDisco = disco.DarNombreDisco();
			}
			contador++;
		}

		return `<p>El Disco ${nombreDisco} es el más largo y tiene una duracion de ${max} segundos</p>`;
	}

	
	this.Armar = () => {
		let contador = 0;
		let acumulador = 0;
		this.promedio = 0;
		// Armo la info de cada disco:
		let m = `
			<p>Nombre: ${nombre}</p>
			<p>Autor/Banda: ${autor}</p>
			<p>Codigo: ${codigo}</p>
			<ul>
		`;
		// Recorro las pistas:
		for (let pista of Pistas) {
			// Activo el contador
			contador++;
			acumulador += pista.duracion;
			// Debo acceder al método Armar de cada pista:
			m += pista.Armar();
		}

		this.promedio = acumulador / contador;
		m += `<p>El disco tiene ${contador} pistas</p>
		<p>El disco dura ${acumulador} segundos</p>
		<p>La duración promedio de las pistas es ${this.promedio} segundos</p>`;
		return m;
	}
}

function Pista(
	pista = 'Nombre de pista',
	duracion = 0,) {

this.PedirNombre = () => {
	do {
		pista = prompt('Ingrese el nombre de la pista');

		if(!isNaN(pista) || pista == 'Nombre de pista'){
			alert('Ingresaste un dato no válido')
		}

	} while (!isNaN(pista));
	this.pista = pista;
}


this.PedirDuracion = () => {
	do {
		duracion = parseInt(prompt('Ingrese cuanto dura la pista'));

		if(isNaN(duracion) || duracion <= 0 || duracion>7200){
			alert('Ingresaste un dato no válido')
		}

	} while (isNaN(duracion) || duracion>7200 || duracion <= 0);
	this.duracion = duracion;
}

//Getters
this.DarNombrePista = () => (this.PedirNombre)

this.DarDuracionPista = () => (this.PedirDuracion)

//Armado de muestra de datos para cada pista
this.Armar = function () {
	if (duracion > 180) {
		let m = `<li>Pista: ${pista} - Duracion: <span style="color:red;font-size:1em">${duracion}</li>`;
		return m;
	} else {
	let m = `<li>Pista: ${pista} - Duracion: ${duracion}</li>`;
	return m;
	}
	}
}

//----------------------------------

function Cargar() {
	// Variables:
	let disco;
	
	// Creo el disco:
	disco = new Disco();
	
	// Pido su nombre:
	disco.PedirNombre();

	// Pido su autor:
	disco.PedirAutor();

	// Pido su codigo:
	disco.PedirCodigo();
	
	// canciones:
	do {
		// Creo la cancion:
		let pista = new Pista();
		// Pido nombre y duracion:
		pista.PedirNombre();
		pista.PedirDuracion();
		// La guardo en el listado:
		disco.GuardarPista(pista);
	} while (confirm('El disco tiene más pistas?'))
	
	// Guardo al disco en el array:
	aDiscos.push(disco);
}



// Función Mostrar:
function Mostrar() {
	let html = '';
	let cont = 0;
	let discoLargo; 

	// Recorro y voy armando
	for (let disco of aDiscos) {
		// Muestro cada alumno:
		cont++;
		html += disco.Armar();
		html += '<hr />'
	}
	for (let disco of aDiscos) {
	discoLargo = disco.DiscoMasLargo();
}
if (cont != 0) {
	html+= discoLargo;
}

	html += `<p>Hay ${cont} discos cargados</p>`


	document.getElementById('info').innerHTML = html; 
}


