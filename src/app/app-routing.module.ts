import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarHuespedesComponent } from './huespedes/lista/listar-huespedes.component';
import { ListarEmpleadoComponent } from './empleado/listar/listar-empleado.component';
import { LoginComponent } from './autenticacion/login/login.component';
import { CrearHuespedesComponent } from './huespedes/crear/crear-huespedes.component';
import { ActualizarHuespedesComponent } from './huespedes/editar/actualizar-huespedes.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'listarHuespedes', component: ListarHuespedesComponent },
  { path: 'listarHuespedes/page/:page', component: ListarHuespedesComponent },
  { path: 'listarEmpleados', component: ListarEmpleadoComponent },
  { path: 'crearHuesped', component: CrearHuespedesComponent },
  { path: `actualizarHuesped/:codHuesped`, component: ActualizarHuespedesComponent},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
