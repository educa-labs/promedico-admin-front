import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

export class User {
	/* Clase usuario para guardar la información del usuario actual.
	Recibe el id, el nombre, ocupacion, email, clíinica a la que pertenece
	y el token del usuario */
	id: number;
	name: string;
	ocupacion: string;
	email: string;
	clinica: string;
	token: any;

	constructor(id: number, name: string, ocupacion: string,
		email: string, token: any, clinica: string) {
		/* Setear la información del usuario actual */
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
	// Información recibida
	data: any;
	// Token del usuario
	token: any;

	constructor(public http: Http, public loading: LoadingController) {}

	public login(credenciales) {
		/* login: recibe credenciales. Revisa si esas credenciales no son nulas
		y si no lo son hace una consulta a la API */
		// Revisa si las credenciales son nulas
		if (credenciales.email === null || credenciales.password === null ) {
			// Si son nulas retorna un mensaje diciendo que ingrese las credenciales
			return Observable.throw("Ingresa las credenciales");
		}
		// Si las credenciales no son nulas
		else {
			// Retorna y crea un observable
			return Observable.create(observer => {
				// Crear y agregar Headers para hacer POST a la API
				let headers = new Headers();
				headers.append('Content-Type', undefined);
				// Hacer POST a la API
				this.http.post('http://api.promedico.cl/login', JSON.stringify(credenciales), {headers: headers})
					.map(res => res.json())
					.subscribe(data => {
						// Crear cargador
						let loader = this.loading.create({
							content: 'Cargando...'
						});
						// Mostrar cargador en pantalla
						loader.present();
						// Guardar data recibida
						this.data = data._body;
						// Guardar token 
						this.token = data['token'];
						// Setear usuario actual con la información recibida
						this.currentUser = new User(data['id'], data["nombre"], 
													data["ocupacion"], data['mail'], 
													data['token'], data['clinica'])
						// Desaparece loader de la pantalla
						loader.dismiss();
						// El observer pasa solo si el usuario ingresado es administrador
						observer.next(data['admin']);
						// Completar observer
						observer.complete();
					});
			})
		}
	}

	public getUserInfo(): User {
		/* getUserInfo: retorna toda la información del usuario actual 
		guardada en currentUser */
		return this.currentUser
	}

	public getUserToken() {
		/* getUserToken: retorna el token del usuario actual guardado */
		return this.token
	}

	public logOut() {
		/* logOut: retorna un observable. Setea el usuario actual a null */
		return Observable.create(observer => {
			// Setea el usuario actual a null
			this.currentUser = null;
			// Siempre se completa el observer
			observer.next(true);
			observer.complete()
		})
	}
}