import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  	selector: 'page-about',
  	templateUrl: 'about.html'
})
export class AboutPage {
	/* Sobre Nosotros: pagina donde se muestra información del administrador. Que 
	es desarrollador por Educalabs, información de contacto y la versión. */

  	constructor(public navCtrl: NavController, public navParams: NavParams) {}

}