import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';


@Injectable()
export class Data {

	info: any;

	getAllUsers(token) {
		/* Funcion que recibe todos las canciones */
		if (this.info) {
			return Promise.resolve(this.info);
		}

		let loader = this.loading.create({
			content: 'Recibiendo información usuarios...'
		});

		loader.present();
		return new Promise(resolve =>  {
			this.http.get('http://educalabs.cl:5000/getAllUsers/' + token)
				.map(res => res.json())
				.subscribe(data => {
					this.info = data['users']
					console.log(data)
					resolve(this.info);
				});
				loader.dismiss();
		})
	}

	
	constructor(
		public http: Http,
		public loading: LoadingController) {}


}