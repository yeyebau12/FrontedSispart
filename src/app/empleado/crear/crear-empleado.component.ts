import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sexo } from 'src/app/models/sexo';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { TipoSangre } from 'src/app/models/tipo-sangre';
import { EmpleadoService } from 'src/app/service/empleado/empleado.service';
import { SexoService } from 'src/app/service/sexo/sexo.service';
import { TipoDocumentoService } from 'src/app/service/tipoDocumento/tipo-documento.service';
import { TipoSangreService } from 'src/app/service/tipoSangre/tipo-sangre.service';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent {

  form: any = {}
  idTipoDocumento: TipoDocumento[] = [];
  idSexo: Sexo[] = [];
  idTipoSangre: TipoSangre[] = [];


  constructor(
    private empleadoService: EmpleadoService,
    private tipoDocumentoService: TipoDocumentoService,
    private sexoService: SexoService,
    private tipoSangreService: TipoSangreService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.tipoDocumentoService.listarTipoDocumentos().subscribe(
      resp => {
        this.idTipoDocumento = resp;
        console.log(resp);
      },
      (error: any) => {
        console.error(error);
      }
    );

    this.sexoService.listarSexos().subscribe(
      resp => {
        this.idSexo = resp;
        console.log(resp);
      },
      (error: any) => {
        console.error(error);
      }
    );

    this.tipoSangreService.listarTipoSangre().subscribe(
      resp => {
        this.idTipoSangre = resp;
        console.log(resp);
      },
      (error: any) => {
        console.error(error);
      }
    );


  }

  onCreateEmpleado(): void {
    this.empleadoService.createEmpleado(this.form).subscribe(

      response => {
        this.router.navigate(['/listarEmpleados']);
        console.log(response);
      }
    )

  }



}
