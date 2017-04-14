import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, MenuController } from 'ionic-angular';
// Importar paginas
import { UsuariosPage } from '../usuarios/usuarios';
// Importar providers
import { Auth } from '../../providers/auth';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	/* Login: Pagina de login del administrador el usuario ingresa credenciales
	y si es administrador pasa a la siguiente pagina */

	// Credenciales par hacer el login
	credenciales = {mail: '', password: ''};	

	constructor(
		public nav: NavController, 
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		public menuCtrl: MenuController,
		public auth: Auth) {

		// Deshabilitar el menu dentro del login
		this.menuCtrl.enable(false);
	}

	public login() {
		/* Login: funcion que llama a auth.login, mandando las credenciales
		ingresadas por el usuario. Si el ingreso es correcto se setea la pagina
		Root, si es falso se muestra una alerta */
		this.auth.login(this.credenciales).subscribe(allowed => {
			// Si tiene acceso
			if (allowed) {
				// Cambiar pagina root por el inicio
				this.nav.setRoot(UsuariosPage);
				// Habilitar el menu
				this.menuCtrl.enable(true);
			}
			// Si es que no tiene acceso
			else {
				alert("Acceso denegado");
			}
		},
		// Si existe un error en la funcion auth.login
		error => {
			// Imprimir el error
			alert(error);
		});
	}
}