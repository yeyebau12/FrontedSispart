import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Checkin } from 'src/app/models/checkin';
import { CheckInService } from 'src/app/service/checkIn/check-in.service';

@Component({
  selector: 'app-listar-chec-in',
  templateUrl: './listar-chec-in.component.html',
  styleUrls: ['./listar-chec-in.component.css']
})
export class ListarChecInComponent {

  checkin!: Checkin[];
  paginador: any;
  color: ThemePalette = 'warn';
  checked = true;
  disabled = true;

  constructor(
    private checkinService: CheckInService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) { }


  //columnas e inicializacion de la tabla huespedes
  displayedColumns: string[] = ['codigo','fechaEntrada','fechaSalida','codHuesped','codHuesped.num','codHabitacion',  'acciones'];
  dataSource = this.checkin;

  ngOnInit() {
   

    this.cargarCheckin();
    this.navigation();
    
   
  }


  cargarCheckin(): void {

    this.activatedRoute.paramMap.subscribe((params: any) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.checkinService.listarCheckin(page).subscribe(
        (data: any) => {
          this.checkin = data.content as Checkin[];
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

  navigation(): void {
    let list: NodeListOf<Element> = document.querySelectorAll(".navigation li");

    function activeLink(this: Element) {
      list.forEach(item => {
        item.classList.remove("hovered");
      })

      this.classList.add("hovered");
    }

    list.forEach(item => item.addEventListener("mouseover", activeLink));
  }

  toggle(): void {

    let toggle: HTMLElement | null = document.querySelector(".toggle");
    let navigation: HTMLElement | null = document.querySelector(".navigation");
    let main: HTMLElement | null = document.querySelector(".main");

    toggle?.addEventListener("click", function () {
      navigation?.classList.toggle("active");
      main?.classList.toggle("active");
    });
  }

}
