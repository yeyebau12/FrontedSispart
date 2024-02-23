import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Huesped } from 'src/app/models/huesped';
import { HuespedService } from 'src/app/service/huesped/huesped.service';

import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from '../detail/detail.component';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../detail/modal.service';

@Component({
  selector: 'app-listar-huespedes',
  templateUrl: './listar-huespedes.component.html',
  styleUrls: ['./listar-huespedes.component.css'],
})
export class ListarHuespedesComponent {
  huespedes!: Huesped[];
  paginador: any;
  color: ThemePalette = 'warn';
  selectHuesped!: Huesped;
  checked = true;
  disabled = true;

  constructor(
    private huespedService: HuespedService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
  ) {}

  //columnas e inicializacion de la tabla huespedes
  displayedColumns: string[] = [
    'codigo',
    'tipoDocumento',
    'numDocumento',
    'Nombre',
    'Apellido',
    'NumeroCelular',
    'Correo',
    'acciones',
  ];
  dataSource = this.huespedes;

  ngOnInit() {
    this.cargarHuesped();

    this.navigation();
  }

  cargarHuesped(): void {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.huespedService.listarHuespedes(page).subscribe(
        (data: any) => {
          this.huespedes = data.content as Huesped[];
          this.paginador = data;
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  openDialog(huesped: Huesped) {
    this.selectHuesped = huesped;
    this.modalService.openModal();
  }

  deleteHuesped(huesped: Huesped): void {
    this.huespedService
      .deleteHuesped(huesped.codHuesped)
      .subscribe((response) => {
        this.huespedes = this.huespedes.filter((hues) => hues !== huesped);
        console.log(response);
      });
  }

  navigation(): void {
    let list: NodeListOf<Element> = document.querySelectorAll('.navigation li');

    function activeLink(this: Element) {
      list.forEach((item) => {
        item.classList.remove('hovered');
      });

      this.classList.add('hovered');
    }

    list.forEach((item) => item.addEventListener('mouseover', activeLink));
  }

  toggle(): void {
    let toggle: HTMLElement | null = document.querySelector('.toggle');
    let navigation: HTMLElement | null = document.querySelector('.navigation');
    let main: HTMLElement | null = document.querySelector('.main');

    toggle?.addEventListener('click', function () {
      navigation?.classList.toggle('active');
      main?.classList.toggle('active');
    });
  }
}
