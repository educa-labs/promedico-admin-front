import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Importar paginas
import { TabsPage } from '../pages/tabs/tabs';
import { UsuariosPage } from '../pages/usuarios/usuarios';
import { LoginPage } from '../pages/login/login';

// Importar providers
import { Auth } from '../providers/auth';


@Component({
	templateUrl: 'app.html'
})
export class MyApp {

	@ViewChild(Nav) nav: Nav;

	rootPage:any = LoginPage;
	paginas: any;
	opciones: any;

	constructor(
		platform: Platform, 
		statusBar: StatusBar, 
		splashScreen: SplashScreen,
		private auth: Auth) {

			this.paginas = [
				{titulo: "Inicio", component: TabsPage, icon: "home"},
				{titulo: "Medicos", component: UsuariosPage, icon: "person"},
				{titulo: "Noticias", component: "-", icon: "paper"}];

			this.opciones = [
				{titulo: "Sobre nosotros", component: "-", icon: "information"}]

			platform.ready().then(() => {
				// Okay, so the platform is ready and our plugins are available.
				// Here you can do any higher level native things you might need.
				statusBar.styleDefault();
				splashScreen.hide();
			});
		}

	 
	openPage(page) {
		this.nav.setRoot(page.component)
	}

	cerrarSesion() {
		this.auth.logOut().subscribe(succ => {
			alert("Cerraste Sesión");
			this.nav.setRoot(LoginPage)
		})
	}
}
