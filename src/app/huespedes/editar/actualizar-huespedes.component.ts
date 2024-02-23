import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-actualizar-huespedes',
  templateUrl: './actualizar-huespedes.component.html',
  styleUrls: ['./actualizar-huespedes.component.css'],
})
export class ActualizarHuespedesComponent {
  form: any = {};
  huespedes!: Huesped;
  idTipoDocumento: TipoDocumento[] = [];
  idNacionalidad: Nacionalidad[] = [];
  idRegion: Region[] = [];
  idHabitacion: Habitaciones[] = [];

  color: ThemePalette = 'warn';
  checked = true;
  disabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private huespedService: HuespedService,
    private nacionalidadService: NacionalidadService,
    private regionService: RegionService,
    private tipoDocumentoService: TipoDocumentoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.uploadHuesped();

    this.tipoDocumentoService.listarTipoDocumentos().subscribe(
      (resp) => {
        this.idTipoDocumento = resp;
        console.log(resp);
      },
      (error: any) => {
        console.error(error);
      }
    );

    this.nacionalidadService.listarNacionalidades().subscribe(
      (resp) => {
        this.idNacionalidad = resp;
        console.log(resp);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  uploadHuesped(): void {
    this.activatedRoute.params.subscribe((params) => {
      let codHuesped = params['codHuesped'];
      if (codHuesped) {
        this.huespedService
          .viewHuesped(codHuesped)
          .subscribe((form) => (this.form = form));
      }
    });
  }

  updateHuesped(): void {
    this.huespedService.updateHuesped(this.form).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/listarHuespedes']);
    });
  }

  volver(): void {
    this.router.navigate(['/listarHuespedes']);
  }

  validation(): void {
    (() => {
      'use strict';

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms: NodeListOf<HTMLFormElement> =
        document.querySelectorAll('.needs-validation');

      // Loop over them and prevent submission
      Array.from(forms).forEach((form: HTMLFormElement) => {
        form.addEventListener(
          'submit',
          (event: Event) => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }

            form.classList.add('was-validated');
            this.updateHuesped();
          },
          false
        );
      });
    })();
  }
}
