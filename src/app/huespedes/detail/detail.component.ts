import { Component, Inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Factura } from 'src/app/models/factura';
import { Huesped } from 'src/app/models/huesped';
import { Nacionalidad } from 'src/app/models/nacionalidad';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { FacturaServiceService } from 'src/app/service/factura/factura.service';
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
    estadoHuesped: true,
    facturas:[]
  };
  idTipoDocumento: TipoDocumento[] = [];
  idNacionalidad: Nacionalidad[] = [];
  color: ThemePalette = 'warn';
  checked = true;
  disabled = false;



  constructor(
    private huespedService: HuespedService,
    private facturaService: FacturaServiceService,
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

  deleteFactura(factura:Factura):void{

    this.facturaService.deleteFactura(factura.codFactura).subscribe(
      response => {
        this.huesped.facturas = this.huesped.facturas.filter(fact => fact !== factura)
        console.log(response);
      }
    )

  }

  volver(): void {
    this.router.navigate(['/listarHuespedes']);
  }






}




