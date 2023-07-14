import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Nacionalidad } from 'src/app/models/nacionalidad';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { HuespedService } from 'src/app/service/huesped/huesped.service';
import { NacionalidadService } from 'src/app/service/nacionalidad/nacionalidad.service';
import { TipoDocumentoService } from 'src/app/service/tipoDocumento/tipo-documento.service';

@Component({
  selector: 'app-actualizar-huespedes',
  templateUrl: './actualizar-huespedes.component.html',
  styleUrls: ['./actualizar-huespedes.component.css']
})
export class ActualizarHuespedesComponent {

  form: any = {}
  idTipoDocumento: TipoDocumento[] = [];
  idNacionalidad: Nacionalidad[] = [];
  color: ThemePalette = 'warn';
  checked = true;
  disabled = false;
  
  constructor(
    private huespedService: HuespedService,
    private tipoDocumentoService: TipoDocumentoService,
    private nacionalidadService: NacionalidadService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.uploadHuesped()

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

  uploadHuesped(): void{

    this.activatedRoute.params.subscribe(params => {
      let codHuesped = params['codHuesped'];
      if (codHuesped){
        this.huespedService.viewHuesped(codHuesped).subscribe((form) => this.form = form)

      }
    })

  }

  updateHuesped():void {

    this.huespedService.updateHuesped(this.form).subscribe(
      response => {
        this.router.navigate(['/listarHuespedes'])
        console.log(response)
      }
    )
  }

}
