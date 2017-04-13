import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// Importar paginas
import { UsuariosPage } from '../pages/usuarios/usuarios';
import { LoginPage } from '../pages/login/login';
// Importar providers
import { Auth } from '../providers/auth';
	
@Component({
	templateUrl: 'app.html'
})

export class MyApp {

	@ViewChild(Nav) nav: Nav;
	// Root de la pagina
	rootPage:any = LoginPage;
	// Paginas del menu
	paginas: any;
	// Opciones del menu
	opciones: any;

	constructor(
		platform: Platform, 
		statusBar: StatusBar, 
		splashScreen: SplashScreen,
		private auth: Auth) {

			// Configurar paginas del menu
			this.paginas = [
				{titulo: "Medicos", component: UsuariosPage, icon: "person"},
				{titulo: "Noticias", component: "-", icon: "paper"}
			];
			// Configurar opciones del menu
			this.opciones = [
				{titulo: "Sobre nosotros", component: "-", icon: "information"}
			];
			// Cuando la plataforma ya cargó
			platform.ready().then(() => {
				statusBar.styleDefault();
				splashScreen.hide();
			});
	}
	 
	openPage(page) {
		/* openPage: Al apretar un item del menu. Setea la pagina root a la 
		del componente clickeado */
		this.nav.setRoot(page.component)
	}

	cerrarSesion() {
		/* cerrarSesion: Cierra la sesión actual. Llama a la funcion auth.logOut */
		this.auth.logOut().subscribe(succ => {
			// Muestra una alerta
			alert("Cerraste Sesión");
			// Setea la pagina root al Login
			this.nav.setRoot(LoginPage)
		})
	}
}