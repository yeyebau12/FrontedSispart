import { Component } from '@angular/core';
import { Huesped } from 'src/app/models/huesped';
import { HuespedService } from 'src/app/service/huesped/huesped.service';

import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-listar-huespedes',
  templateUrl: './listar-huespedes.component.html',
  styleUrls: ['./listar-huespedes.component.css']
})
export class ListarHuespedesComponent {

  huespedes!: Huesped[];
  paginador: any;
  color: ThemePalette = 'warn';
  checked = true;
  disabled = true;

  constructor(
     private huespedService: HuespedService,
     private activatedRoute: ActivatedRoute,
     public dialog:MatDialog
     ) { }

  //columnas e inicializacion de la tabla huespedes
  displayedColumns: string[] = ['codigo', 'tipoDocumento', 'numDocumento', 'Nombre', 'Apellido', 'Direccion', 'NumeroCelular', 'Correo','acciones'];
  dataSource = this.huespedes;


  ngOnInit() {
    this.cargarHuesped();
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
        err => {
          console.log(err);
        }

      );
    }

    );

  }

 

  deleteHuesped(huesped: Huesped): void {

    this.huespedService.deleteHuesped(huesped.codHuesped).subscribe(
      response => {
        this.huespedes = this.huespedes.filter(hues => hues !== huesped)
        console.log(response);
      }
    )

  }

}
