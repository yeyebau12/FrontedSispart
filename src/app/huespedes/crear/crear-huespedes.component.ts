import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Nacionalidad } from 'src/app/models/nacionalidad';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { HuespedService } from 'src/app/service/huesped/huesped.service';
import { NacionalidadService } from 'src/app/service/nacionalidad/nacionalidad.service';
import { TipoDocumentoService } from 'src/app/service/tipoDocumento/tipo-documento.service';


@Component({
  selector: 'app-crear-huespedes',
  templateUrl: './crear-huespedes.component.html',
  styleUrls: ['./crear-huespedes.component.css']
})
export class CrearHuespedesComponent {

  form: any = {}
  idTipoDocumento: TipoDocumento[] = [];
  idNacionalidad: Nacionalidad[] = [];

  constructor(
    private huespedService: HuespedService,
    private tipoDocumentoService: TipoDocumentoService,
    private nacionalidadService: NacionalidadService,
    private router: Router
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


    this.nacionalidadService.listarNacionalidades().subscribe(
      resp => {
        this.idNacionalidad = resp;
        console.log(resp);
      },
      (error: any) => {
        console.error(error);
        console.log(error);
      }
    );
  }


  onCreateHuesped(): void {
    this.huespedService.createHuesped(this.form).subscribe(

      response => {
        this.router.navigate(['/listarHuespedes'])
        console.log(response);
      }
    )

  }
}
