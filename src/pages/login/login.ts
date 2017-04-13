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

		this.auth.login(this.credenciales).subscribe(allowed => {
			// Si tiene acceso
			if (allowed) {
				/* Cambiar la pagina Root a Inicio,
				habilitar menu y sacar cargando */
				this.nav.setRoot(UsuariosPage);
				this.menuCtrl.enable(true);
			}

			// Si es que no tiene acceso
			else {
				alert("Acceso denegado");
			}
		},
		error => {
			alert(error);
		});
	}

}