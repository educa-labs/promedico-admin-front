import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  	selector: 'page-noticias',
  	templateUrl: 'noticias.html'
})

export class NoticiasPage {
	/* Noticias: pagina donde se muestra una lista de las noticias y tiene
	navegacion con agregar noticias */

  	constructor(public navCtrl: NavController, public navParams: NavParams) {}

}