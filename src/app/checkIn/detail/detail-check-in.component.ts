import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Checkin } from 'src/app/models/checkin';
import { Factura } from 'src/app/models/factura';
import { CheckInService } from 'src/app/service/checkIn/check-in.service';
import { FacturaServiceService } from 'src/app/service/factura/factura.service';

@Component({
  selector: 'app-detail-check-in',
  templateUrl: './detail-check-in.component.html',
  styleUrls: ['./detail-check-in.component.css']
})
export class DetailCheckInComponent {

  checkIn: Checkin = {
    fechaEntrada: new Date(),
    fechaSalida: new Date(),
    codHuesped: {
      nombre: '',
      apellido: '',
      numCelular: 0,
      correo: '',
      tipoDocumento: {
        nomTipoDocumento: ''
      },
      numDocumento: 0,
      fechaNacimiento: new Date(),
      edad: 0,
      nacionalidad: {
        nombre: ''
      },
      lugarOrigen: {
        nacionalidad: {
          nombre: ''
        },
        nombre: ''
      },
      nomContactoEmergencia: '',
      numContactoEmergencia: 0,
      estadoHuesped: false,
      checkin: []
    },
    codHabitacion: {
      nombreHabitacion: {
        nombre: '',
        precioDia: 0
      },
      descripHabitacion: '',
      numHabitacion: 0,
      pisoHabitacion: 0,
      maxPersonasDisponibles: 0,
      estadoHabitacion: {
        nombre: ''
      },
      imagenHabitacion: ''
    },
    facturas: []
  }

  constructor(
    private checkinService: CheckInService,
    private facturaService: FacturaServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params: any) => {
      let codCheckin = +params.get('codCheckin');
      if (codCheckin) {
        this.checkinService.viewCheckin(codCheckin).subscribe(form => {
          this.checkIn = form;
          console.log(form);
        },
          err => {
            this.volver();
          });

      }
    }
    )
  }

  deleteFactura(factura: Factura): void {

    this.facturaService.deleteFactura(factura.codFactura).subscribe(
      response => {
        this.checkIn.facturas = this.checkIn.facturas.filter(fact => fact !== factura)
        console.log(response);
      }
    )

  }

  volver(): void {
    this.router.navigate(['/listarCheckin']);
  }

}
