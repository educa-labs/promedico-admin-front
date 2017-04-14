import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class Data {
	/* Provider Data: todas las funciones para recibir data */

	// Información recibida
	info: any;
	// API
	api: any = 'http://api.promedico.cl';

	constructor(
		public http: Http,
		public loading: LoadingController) {}

	getAllUsers(token) {
		/* Funcion que recibe todos los usuarios. Manda Token y retorna
		todos los usuarios del departamento del usuario actual */
		if (this.info) {
			return Promise.resolve(this.info);
		}
		// Crear loader
		let loader = this.loading.create({
			content: 'Recibiendo información usuarios...'
		});
		// Mostrar loader en pantalla
		loader.present();
		// Retornar una promesa y guardar la información
		return new Promise(resolve =>  {
			// Hacer GET a la API
			this.http.get(this.api + '/getAllUsers/' + token)
				.map(res => res.json())
				.subscribe(data => {
					// Guardar información de los usuarios
					this.info = data['users']
					/* Imprimir información
					console.log(data) */
					resolve(this.info);
				});
				// Desaparece loader de la pantalla
				loader.dismiss();
		})
	}
}