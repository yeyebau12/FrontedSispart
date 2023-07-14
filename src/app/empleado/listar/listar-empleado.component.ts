import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/service/empleado/empleado.service';

@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css']
})
export class ListarEmpleadoComponent {

  empleados!: Empleado[];

  constructor(private empleadoService: EmpleadoService, public dialog: MatDialog) { }

  //columnas e inicializacion de la tabla empleados
  displayedColumns: string[] = ['codigo', 'tipoDocumento', 'numDocumento', 'nombre', 'apellido', 'acciones'];
  dataSource = this.empleados;

  ngOnInit() {
    this.cargarEmpleado();

  }

  cargarEmpleado(): void {

    
  }
}
