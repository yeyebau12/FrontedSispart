import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarHuespedesComponent } from './huespedes/lista/listar-huespedes.component';
import { ListarEmpleadoComponent } from './empleado/listar/listar-empleado.component';
import { LoginComponent } from './autenticacion/login/login.component';
import { CrearHuespedesComponent } from './huespedes/crear/crear-huespedes.component';
import { ActualizarHuespedesComponent } from './huespedes/editar/actualizar-huespedes.component';
import { DetailComponent } from './huespedes/detail/detail.component';
import { CrearEmpleadoComponent } from './empleado/crear/crear-empleado.component';
import { EditarEmpleadoComponent } from './empleado/editar/editar-empleado.component';
import { DetailEmpleadoComponent } from './empleado/deatil/detail-empleado.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'listarHuespedes', component: ListarHuespedesComponent },
  { path: 'listarEmpleados', component: ListarEmpleadoComponent },
  { path: `listarHuespedes/page/:page`, component: ListarHuespedesComponent },
  { path: `listarEmpleados/page/:page`, component: ListarEmpleadoComponent },
  { path: 'listarEmpleados', component: ListarEmpleadoComponent },
  { path: 'crearHuesped', component: CrearHuespedesComponent },
  { path: 'crearEmpleado', component: CrearEmpleadoComponent },
  { path: `actualizarHuesped/:codHuesped`, component: ActualizarHuespedesComponent },
  { path: `actualizarEmpleado/:codEmpleado`, component: EditarEmpleadoComponent },
  { path: `verHuesped/:codHuesped`, component: DetailComponent },
  { path: `verEmpleado/:codEmpleado`, component: DetailEmpleadoComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
