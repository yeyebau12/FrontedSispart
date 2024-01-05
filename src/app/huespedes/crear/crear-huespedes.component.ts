import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Habitaciones } from 'src/app/models/habitaciones';
import { Huesped } from 'src/app/models/huesped';
import { Nacionalidad } from 'src/app/models/nacionalidad';
import { Region } from 'src/app/models/region';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { HuespedService } from 'src/app/service/huesped/huesped.service';
import { NacionalidadService } from 'src/app/service/nacionalidad/nacionalidad.service';
import { RegionService } from 'src/app/service/region/region.service';
import { TipoDocumentoService } from 'src/app/service/tipoDocumento/tipo-documento.service';


@Component({
  selector: 'app-crear-huespedes',
  templateUrl: './crear-huespedes.component.html',
  styleUrls: ['./crear-huespedes.component.css']
})
export class CrearHuespedesComponent {

  form!: FormGroup;
  idTipoDocumento: TipoDocumento[] = [];
  idNacionalidad: Nacionalidad[] = [];
  idRegion: Region[] = [];
  idHabitacion: Habitaciones[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private huespedService: HuespedService,
    private tipoDocumentoService: TipoDocumentoService,
    private nacionalidadService: NacionalidadService,
    private regionService: RegionService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      numCelular: [''],
      correo: [''],
      tipoDocumento: [''],
      numDocumento: [''],
      fechaNacimiento: [''],
      edad: [''],
      nacionalidad: [''],
      lugarOrigen: [''],
      nomContactoEmergencia: [''],
      numContactoEmergencia: [''],

    });

    this.form.get('nacionalidad')?.valueChanges.subscribe(value => {

      this.regionService.listarRegionesByNacionalidad(value.codNacion).subscribe(
        resp => {
          this.idRegion = resp;
          console.log(resp);

        },
        err => {
          console.error(err);
        });


    });

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

      }
    );
  }


  onCreateHuesped(): void {
    this.huespedService.createHuesped(this.form.value).subscribe(

      response => {
        console.log(this.form.value);
        this.router.navigate(['/listarHuespedes'])

      }
    )

  }



  volver(): void {
    this.router.navigate(['/listarHuespedes']);
  }

  validation(): void {

    (() => {
      'use strict'

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms: NodeListOf<HTMLFormElement> = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.from(forms).forEach((form: HTMLFormElement) => {
        form.addEventListener('submit', (event: Event) => {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
          this.onCreateHuesped();
        }, false)
      })
    })()

  }
}
