import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// Importar paginas
import { UsuariosPage } from '../pages/usuarios/usuarios';
import { LoginPage } from '../pages/login/login';
import { DetalleUsuarioPage } from '../pages/detalle-usuario/detalle-usuario';
import { NoticiasPage } from '../pages/noticias/noticias';
import { AboutPage } from '../pages/about/about';
// Importar Providers
import { Auth } from '../providers/auth';

@NgModule({
  declarations: [
    MyApp,
    UsuariosPage,
    LoginPage,
    DetalleUsuarioPage,
    NoticiasPage,
    AboutPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UsuariosPage,
    LoginPage,
    DetalleUsuarioPage,
    NoticiasPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Auth
  ]
})
export class AppModule {}