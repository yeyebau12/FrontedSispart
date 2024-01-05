import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/service/empleado/empleado.service';

@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css']
})
export class ListarEmpleadoComponent {

  empleados!: Empleado[];
  paginador: any;
  color: ThemePalette = 'warn';
  checked = true;
  disabled = true;

  constructor(
    private empleadoService: EmpleadoService, 
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) { }

  //columnas e inicializacion de la tabla empleados
  displayedColumns: string[] = ['codigo', 'tipoDocumento', 'numDocumento', 'nombre', 'apellido','correo','numContacto', 'acciones'];
  dataSource = this.empleados;

  ngOnInit() {
    this.cargarEmpleado();
   
  }

  cargarEmpleado(): void {

    this.activatedRoute.paramMap.subscribe((params: any) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.empleadoService.listarEmpleados(page).subscribe(
        (data: any) => {
          this.empleados = data.content as Empleado[];
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

  deleteEmpleado(empleado: Empleado): void {

    this.empleadoService.deleteEmpleado(empleado.codEmpleado).subscribe(
      response => {
        this.empleados = this.empleados.filter(empl => empl !== empleado)
        console.log(response);
      }
    )

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
    console.log("me toca")
    let toggle: HTMLElement | null = document.querySelector(".toggle");
    let navigation: HTMLElement | null = document.querySelector(".navigation");
    let main: HTMLElement | null = document.querySelector(".main");

    toggle?.addEventListener("click", function () {
      navigation?.classList.toggle("active");
      main?.classList.toggle("active");
    });
  }


}
