import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Habitaciones } from 'src/app/models/habitaciones';
import { HabitacionService } from 'src/app/service/habitacion/habitacion.service';

@Component({
  selector: 'app-listar-habitacion',
  templateUrl: './listar-habitacion.component.html',
  styleUrls: ['./listar-habitacion.component.css']
})
export class ListarHabitacionComponent {
  habitaciones!: Habitaciones[];
  paginador: any;

  constructor(
     private habitacionService: HabitacionService,
     private activatedRoute: ActivatedRoute,
     public dialog:MatDialog
     ) { }

  //columnas e inicializacion de la tabla huespedes
  displayedColumns: string[] = ['codigo', 'nomHabitacion', 'numHabitacion', 'pisoHabitacion', 'maxPersonasDisponibles', 'estadoHabitacion','acciones'];
  dataSource = this.habitaciones;


  ngOnInit() {
    this.cargarHabitaciones();
  }


  cargarHabitaciones(): void {

    this.activatedRoute.paramMap.subscribe((params: any) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.habitacionService.listarHabitaciones(page).subscribe(
        (data: any) => {
          this.habitaciones = data.content as Habitaciones[];
          this.paginador = data;
          console.log(data);
        },
        err => {
          console.error(err.error.mensaje);
        }

      );
    }

    );

  }

 

  deleteHabitacion(habitacion: Habitaciones): void {

    this.habitacionService.deleteHabitaciones(habitacion.codHabitacion).subscribe(
      response => {
        this.habitaciones = this.habitaciones.filter(habi => habi !== habitacion)
        console.log(response);
      }
    )

  }

}
