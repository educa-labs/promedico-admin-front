import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
	selector: 'page-detalle-usuario',
	templateUrl: 'detalle-usuario.html'
})
export class DetalleUsuarioPage {
	/* DetalleUsuario: detalle de cada usuario se muestra la información
	básica de cada usuario */

	// Usuario seleccionado antes. Navegacion con lista de usuarios
	usuario_seleccionado: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public toastCtrl: ToastController) {
			// configurar navegacion
			this.usuario_seleccionado = navParams.get('info')
	}

	mostrarToast() {
		/* MostrarToast: Muestra un toast con lo que es cada cosa. */
		// Crear toast
		let toast = this.toastCtrl.create({
			message: 'Puntaje usuario / Meta',
			duration: 3000
		});
		// Mostrar Toast
		toast.present();
	}
}