import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto/producto.service';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent {
  productos!: Producto[];
  paginador: any;


  constructor(
     private productoService: ProductoService,
     private activatedRoute: ActivatedRoute,
     public dialog:MatDialog
     ) { }

  //columnas e inicializacion de la tabla huespedes
  displayedColumns: string[] = ['codigo', 'nombreProducto', 'marca', 'cantidad', 'precio', 'fechaRegistro', 'horaRegistro','acciones'];
  dataSource = this.productos;


  ngOnInit() {
    this.cargarProducto();
  }


  cargarProducto(): void {

    this.activatedRoute.paramMap.subscribe((params: any) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.productoService.listarProductos(page).subscribe(
        (data: any) => {
          this.productos = data.content as Producto[];
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

 

  deleteProducto(producto: Producto): void {

    this.productoService.deleteProducto(producto.codProducto).subscribe(
      response => {
        this.productos = this.productos.filter(prod => prod !== producto)
        console.log(response);
      }
    )

  }

}
