import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Habitaciones } from 'src/app/models/habitaciones';
import { HabitacionService } from 'src/app/service/habitacion/habitacion.service';

@Component({
  selector: 'app-detail-habitacion',
  templateUrl: './detail-habitacion.component.html',
  styleUrls: ['./detail-habitacion.component.css']
})
export class DetailHabitacionComponent {

  habitacion: Habitaciones = {
    nombreHabitacion: '',
    descripHabitacion: '',
    numHabitacion: 0,
    pisoHabitacion: 0,
    maxPersonasDisponibles: 0,
    precioDia: 0,
    estadoHabitacion: '',
    imagenHabitacion: '',
   
  }

  constructor(
    private habitacionService: HabitacionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params: any) => {
      let codHabitacion = +params.get('codHabitacion');
      if (codHabitacion) {
        this.habitacionService.viewHabitacion(codHabitacion).subscribe(form => {
          this.habitacion = form;
          console.log(this.habitacion);
        },
          err => {
            this.volver();
          });

      }
    }
    )
  }

  volver(): void {
    this.router.navigate(['/listarHabitaciones']);
  }


}
