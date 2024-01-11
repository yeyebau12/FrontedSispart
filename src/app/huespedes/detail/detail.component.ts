import { Component, Inject, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

import { Router } from '@angular/router';
import { Huesped } from 'src/app/models/huesped';
import { Nacionalidad } from 'src/app/models/nacionalidad';
import { TipoDocumento } from 'src/app/models/tipo-documento';

import { HuespedService } from 'src/app/service/huesped/huesped.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  @Input() huesped: Huesped = {
    nombre: '',
    apellido: '',
    numCelular: 0,
    correo: '',
    tipoDocumento: {
      nomTipoDocumento: '',
    },
    numDocumento: 0,
    fechaNacimiento: new Date(),
    edad: 0,
    nacionalidad: {
      nombre: '',
    },
    lugarOrigen: {
      nacionalidad: {
        nombre: '',
      },
      nombre: '',
    },
    nomContactoEmergencia: '',
    numContactoEmergencia: 0,
    estadoHuesped: true,
    checkin: [],
  };

  idTipoDocumento: TipoDocumento[] = [];
  idNacionalidad: Nacionalidad[] = [];
  color: ThemePalette = 'warn';
  checked = true;
  disabled = false;

  constructor(private router: Router, public modalService: ModalService) {}

  ngOnInit() {}

  onClickCancel() {
    this.modalService.closeModal();
  }

  volver(): void {
    this.router.navigate(['/listarHuespedes']);
  }

  obtenerEstadoHuesped(): String {
    return this.huesped.estadoHuesped ? 'Activo' : 'Inactivo';
  }
}
