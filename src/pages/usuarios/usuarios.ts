import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Importar providers
import { Auth } from '../../providers/auth';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
  providers: [Data]
})

export class UsuariosPage {

	// Informacion de los usuarios
	info: any;

	// Info para mandar
	token: any;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public auth: Auth,
				public data: Data)  {
		/* Recibir token para después enviarlo y recibir
		la info de todos los usuarios */
		this.token = this.auth.getUserToken();
		this.getUsers(this.token);

	}

	getUsers(info) {
		this.data.getAllUsers(info)
			.then(data => {
				this.info = data;
			})
	}

	apretarUsuario() {
		return
	}

}