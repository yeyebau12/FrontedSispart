import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HabitacionService } from 'src/app/service/habitacion/habitacion.service';

@Component({
  selector: 'app-crear-habitacion',
  templateUrl: './crear-habitacion.component.html',
  styleUrls: ['./crear-habitacion.component.css']
})
export class CrearHabitacionComponent {

  form: any = {}


  constructor(
    private habitacionService: HabitacionService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }


  onCreateHabitacion(): void {
    this.habitacionService.createHabitacion(this.form).subscribe(

      response => {
        this.router.navigate(['/listarHabitaciones'])
        console.log(response);
      }
    )

  }
}
