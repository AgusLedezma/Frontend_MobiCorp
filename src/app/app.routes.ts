import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { ProductoAdministradorComponent } from './paginas/producto-administrador/producto-administrador.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'producto-administrador', component: ProductoAdministradorComponent },
	{ path: '**', redirectTo: 'login' }
];
