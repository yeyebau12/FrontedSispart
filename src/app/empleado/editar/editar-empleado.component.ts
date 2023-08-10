import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Sexo } from 'src/app/models/sexo';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { TipoSangre } from 'src/app/models/tipo-sangre';
import { EmpleadoService } from 'src/app/service/empleado/empleado.service';
import { SexoService } from 'src/app/service/sexo/sexo.service';
import { TipoDocumentoService } from 'src/app/service/tipoDocumento/tipo-documento.service';
import { TipoSangreService } from 'src/app/service/tipoSangre/tipo-sangre.service';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent {

  form: any = {}
  idTipoDocumento: TipoDocumento[] = [];
  idSexo: Sexo[] = [];
  idTipoSangre: TipoSangre[] = [];
  color: ThemePalette = 'warn';
  checked = true;
  disabled = false;

  constructor(
    private empleadoService: EmpleadoService,
    private tipoDocumentoService: TipoDocumentoService,
    private sexoService: SexoService,
    private tipoSangreService: TipoSangreService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit():void{
    this.uploadEmpleado();

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

  uploadEmpleado(): void{

    this.activatedRoute.params.subscribe(params => {
      let codEmpleado = params['codEmpleado'];
      if (codEmpleado){
        this.empleadoService.viewEmpleado(codEmpleado).subscribe((form) => this.form = form)

      }
    })

  }

  updateEmpleado():void {

    this.empleadoService.updateEmpleado(this.form).subscribe(
      response => {
        this.router.navigate(['/listarEmpleados']);
        console.log(response);
      }
    )
  }




}
