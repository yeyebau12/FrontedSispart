import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarHuespedesComponent } from './huespedes/lista/listar-huespedes.component';
import { ActualizarHuespedesComponent } from './huespedes/editar/actualizar-huespedes.component';
import { CrearHuespedesComponent } from './huespedes/crear/crear-huespedes.component';
import { CrearEmpleadoComponent } from './empleado/crear/crear-empleado.component';
import { ListarEmpleadoComponent } from './empleado/listar/listar-empleado.component';
import { EditarEmpleadoComponent } from './empleado/editar/editar-empleado.component';
import { CrearProductoComponent } from './producto/crear/crear-producto.component';
import { ActualizarProductoComponent } from './producto/editar/actualizar-producto.component';
import { ListarProductoComponent } from './producto/listar/listar-producto.component';
import { HuespedService } from './service/huesped/huesped.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './autenticacion/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';




//external
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { PaginadorComponent } from './paginador/paginador.component';




@NgModule({
  declarations: [
    AppComponent,
    ListarHuespedesComponent,
    ActualizarHuespedesComponent,
    CrearHuespedesComponent,
    CrearEmpleadoComponent,
    ListarEmpleadoComponent,
    EditarEmpleadoComponent,
    CrearProductoComponent,
    ActualizarProductoComponent,
    ListarProductoComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    PaginadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
  ],

  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule
  ],

  providers: [HuespedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
