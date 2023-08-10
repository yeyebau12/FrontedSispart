import { Component, Inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Huesped } from 'src/app/models/huesped';
import { Nacionalidad } from 'src/app/models/nacionalidad';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { HuespedService } from 'src/app/service/huesped/huesped.service';
import { NacionalidadService } from 'src/app/service/nacionalidad/nacionalidad.service';
import { TipoDocumentoService } from 'src/app/service/tipoDocumento/tipo-documento.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  huesped: Huesped = {
    nombre: '',
    apellido: '',
    direccion: '',
    numCelular: 0,
    correo: '',
    tipoDocumento: {
      nomTipoDocumento: ''
    },
    numDocumento: 0,
    nacionalidad: {
      nombre: ''
    },
    lugarOrigen: '',
    nomContactoEmergencia: '',
    numContactoEmergencia: 0,
    estadoHuesped: true
  };
  idTipoDocumento: TipoDocumento[] = [];
  idNacionalidad: Nacionalidad[] = [];
  color: ThemePalette = 'warn';
  checked = true;
  disabled = false;



  constructor(
    private huespedService: HuespedService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params: any) => {
      let codHuesped = +params.get('codHuesped');
      if (codHuesped) {
        this.huespedService.viewHuesped(codHuesped).subscribe(form => {
          this.huesped = form;
        },
          err => {
            this.volver();
          });

      }
    }
    )
  }

  volver(): void {
    this.router.navigate(['/listarHuespedes']);
  }






}




