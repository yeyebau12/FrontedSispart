import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { Sexo } from 'src/app/models/sexo';
import { EmpleadoService } from 'src/app/service/empleado/empleado.service';

@Component({
  selector: 'app-detail-empleado',
  templateUrl: './detail-empleado.component.html',
  styleUrls: ['./detail-empleado.component.css']
})
export class DetailEmpleadoComponent {

  empleado: Empleado = {
    nombre: '',
    apellido: '',
    tipDocumento: {
      nomTipoDocumento: ''
    },
    numDocumento: 0,
    numTelefono: 0,
    correo: '',
    fechaNacimiento: new Date(),
    edad: 0,
    direccion: '',
    nomContactoEmergencia: '',
    numContactoEmergencia: 0,
    eps: '',
    arl: '',
    sexo: {
      nomSexo: ''
    },
    tipoSangre: {
      nomTipoSangre: ''
    },
    fotoEmpleado: ''
  };

  color: ThemePalette = 'warn';
  checked = true;
  disabled = false;

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params: any) => {
      let codEmpleado = +params.get('codEmpleado');
      if (codEmpleado) {
        this.empleadoService.viewEmpleado(codEmpleado).subscribe(form => {
          this.empleado = form;
        },
          err => {
            this.volver();
          });

      }
    }
    )
  }

  volver(): void {
    this.router.navigate(['/listarEmpleados']);
  }

}
