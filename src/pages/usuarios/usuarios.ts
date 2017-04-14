import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// Importar otras paginas
import { DetalleUsuarioPage } from '../detalle-usuario/detalle-usuario';
// Importar providers
import { Auth } from '../../providers/auth';
import { Data } from '../../providers/data';

@Component({
	selector: 'page-usuarios',
	templateUrl: 'usuarios.html',
	providers: [Data]
})

export class UsuariosPage {
	/* Usuarios: Pagina donde se muestra una lista de los médicos
	del departamento que el usuario es administrador */

	// Informacion de los usuarios
	info: any;
	// Info para mandar
	token: any;
	// Usuario que se pushea en la navegación
	usuario_seleccionado: any;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public auth: Auth,
				public data: Data)  {
		// Configurar navegacion
		this.usuario_seleccionado = this.navParams.get('info');
		// Recibir token del usuarioa ctual
		this.token = this.auth.getUserToken();
		// Recibir todos los usuarios
		this.getUsers(this.token);

	}

	getUsers(info) {
		/* getUsers: funcion para recibir todos los médicos del departamento
		que el usuario es administrador */
		this.data.getAllUsers(info)
			.then(data => {
				// Guardar data recibida
				this.info = data;
			})
	}

	apretarUsuario(event, usuario) {
		/* apretarUsuario: navegacion al aparetar un usuario de la tabla de 
		médicos */
		this.navCtrl.push(DetalleUsuarioPage,{
			// Pasar información del usuario apretado
			info: usuario
		}) 
	}
}