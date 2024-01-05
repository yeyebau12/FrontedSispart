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
import { ListarHabitacionComponent } from './habitacion/listar/listar-habitacion.component';
import { CrearHabitacionComponent } from './habitacion/crear/crear-habitacion.component';
import { ActualizarHabitacionComponent } from './habitacion/editar/actualizar-habitacion.component';
import { DetailHabitacionComponent } from './habitacion/detail/detail-habitacion.component';
import { ListarProductoComponent } from './producto/listar/listar-producto.component';
import { CrearProductoComponent } from './producto/crear/crear-producto.component';
import { DetailProductoComponent } from './producto/detail/detail-producto.component';
import { ActualizarProductoComponent } from './producto/editar/actualizar-producto.component';
import { DetailFacturaComponent } from './factura/detail/detail-factura.component';
import { CrearFacturaComponent } from './factura/crear/crear-factura.component';
import { HeaderComponent } from './header/header.component';
import { ListarChecInComponent } from './checkIn/listar/listar-chec-in.component';
import { DetailCheckInComponent } from './checkIn/detail/detail-check-in.component';
import { CrearChecInComponent } from './checkIn/crear/crear-chec-in.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: `listarHuespedes/page/:page`, component: ListarHuespedesComponent },
  { path: 'listarHuespedes', component: ListarHuespedesComponent },
  { path: `listarEmpleados/page/:page`, component: ListarEmpleadoComponent },
  { path: 'listarEmpleados', component: ListarEmpleadoComponent },
  { path: `listarHabitaciones/page/:page`, component: ListarHabitacionComponent },
  { path: 'listarHabitaciones', component: ListarHabitacionComponent },
  { path: `listarProductos/page/:page`, component: ListarProductoComponent },
  { path: 'listarProductos', component: ListarProductoComponent },
  { path: 'listarCheckin', component: ListarChecInComponent },
  { path: `listarCheckin/page/:page`, component: ListarChecInComponent },
  { path: 'crearHuesped', component: CrearHuespedesComponent },
  { path: 'crearEmpleado', component: CrearEmpleadoComponent },
  { path: 'crearHabitacion', component: CrearHabitacionComponent },
  { path: 'crearProducto', component: CrearProductoComponent },
  { path: 'crearFactura/:codCheckin', component: CrearFacturaComponent },
  { path: 'crearCheckin/:codHuesped', component: CrearChecInComponent },
  { path: `actualizarHuesped/:codHuesped`, component: ActualizarHuespedesComponent },
  { path: `actualizarEmpleado/:codEmpleado`, component: EditarEmpleadoComponent },
  { path: `actualizarHabitacion/:codHabitacion`, component: ActualizarHabitacionComponent },
  { path: `actualizarProducto/:codProducto`, component: ActualizarProductoComponent },
  { path: `verHuesped/:codHuesped`, component: DetailComponent },
  { path: `verEmpleado/:codEmpleado`, component: DetailEmpleadoComponent },
  { path: `verHabitacion/:codHabitacion`, component: DetailHabitacionComponent },
  { path: `verCheckin/:codCheckin`, component: DetailCheckInComponent },
  { path: `verProducto/:codProducto`, component: DetailProductoComponent },
  { path: `verFactura/:codFactura`, component: DetailFacturaComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
