import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';


export class User {
	id: number;
	name: string;
	ocupacion: string;
	email: string;
	clinica: string;
	token: any;

	constructor(id: number, name: string, ocupacion: string,
		email: string, token: any, clinica: string) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.token = token;
		this.ocupacion = ocupacion;
		this.clinica = clinica;
	}
}




@Injectable()
export class Auth {
	// Usuario Actual
	currentUser: User;
	data: any;
	token: any;

	public login(credenciales) {

		if (credenciales.email === null || credenciales.password === null ) {
			return Observable.throw("Ingresa las credenciales");
		}

		else {
			/* Crea un obsevable y después llama a la funcion getInfo()
			que retorna una promesa con la info */
			return Observable.create(observer => {
				let headers = new Headers();
				headers.append('Content-Type', undefined);

				this.http.post('http://educalabs.cl:5000/login', JSON.stringify(credenciales), {headers: headers})
					.map(res => res.json())
					.subscribe(data => {
						let loader = this.loading.create({
							content: 'Cargando...'
						});
						loader.present();
						this.data = data._body;
						console.log(data);
						this.token = data['token'];
						this.currentUser = new User(data['id'], data["nombre"], data["ocupacion"], data['mail'], data['token'],
												data['clinica'])
						loader.dismiss();
						observer.next(data['admin']);
						observer.complete();
					});
			})
		}
	}

	public getUserInfo(): User {
		return this.currentUser
	}

	public getUserToken() {
		return this.token
	}

	public logOut() {
		return Observable.create(observer => {
			this.currentUser = null;
			observer.next(true);
			observer.complete()
		})
	}

	constructor(public http: Http, public loading: LoadingController) {}

}
