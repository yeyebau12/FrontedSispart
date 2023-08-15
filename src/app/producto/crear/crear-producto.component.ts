import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/service/producto/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {


  form: any = {}


  constructor(
    private productoService: ProductoService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  onCreateProducto(): void {
    this.productoService.createProducto(this.form).subscribe(

      response => {
        this.router.navigate(['/listarProductos']);
        console.log(response);
      }
    )

  }

}
