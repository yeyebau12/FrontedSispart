import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HabitacionService } from 'src/app/service/habitacion/habitacion.service';

@Component({
  selector: 'app-actualizar-habitacion',
  templateUrl: './actualizar-habitacion.component.html',
  styleUrls: ['./actualizar-habitacion.component.css']
})
export class ActualizarHabitacionComponent {

  
  form: any = {}


  
  constructor(
    private habitacionService: HabitacionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.uploadHabitacion()
  }

  uploadHabitacion(): void{

    this.activatedRoute.params.subscribe(params => {
      let codHabitacion = params['codHabitacion'];
      if (codHabitacion){
        this.habitacionService.viewHabitacion(codHabitacion).subscribe((form) => this.form = form)

      }
    })

  }

  updateHabitacion():void {

    this.habitacionService.updateHabitacion(this.form).subscribe(
      response => {
        this.router.navigate(['/listarHabitaciones']);
        console.log(response)
      }
    )
  }

}
