import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Checkin } from 'src/app/models/checkin';
import { Habitaciones } from 'src/app/models/habitaciones';
import { CheckInService } from 'src/app/service/checkIn/check-in.service';
import { HabitacionService } from 'src/app/service/habitacion/habitacion.service';
import { HuespedService } from 'src/app/service/huesped/huesped.service';

@Component({
  selector: 'app-crear-chec-in',
  templateUrl: './crear-chec-in.component.html',
  styleUrls: ['./crear-chec-in.component.css']
})
export class CrearChecInComponent {

  checkin = new Checkin();
  idHabitacion: Habitaciones[] = []

  constructor(
    private checkinService: CheckInService,
    private huespedService: HuespedService,
    private habitacionService: HabitacionService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {

    this.habitacionService.listaHabitacionesEstado().subscribe(
      resp => {
        this.idHabitacion = resp;
        console.log(resp);
      },
      (error: any) => {
        console.error(error);
      }
    );

    this.activatedRoute.paramMap.subscribe((params: any) => {
      let codHuesped = +params.get('codHuesped');
      this.huespedService.viewHuesped(codHuesped).subscribe(huesped => this.checkin.codHuesped = huesped);
    });
  }

  public createCheckin(): void {
    this.checkinService.createCheckin(this.checkin).subscribe(form => {
      console.log(this.checkin);
      this.router.navigate(['/listarHuespedes']);
    })
  }
}
