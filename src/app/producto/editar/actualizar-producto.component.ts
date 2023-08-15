import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/service/producto/producto.service';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent {

  form: any = {}

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit():void{
    this.uploadProducto();
  }

  uploadProducto(): void{

    this.activatedRoute.params.subscribe(params => {
      let codProducto = params['codProducto'];
      if (codProducto){
        this.productoService.viewProducto(codProducto).subscribe((form) => this.form = form)

      }
    })

  }

  updateProducto():void {

    this.productoService.updateProducto(this.form).subscribe(
      response => {
        this.router.navigate(['/listarProductos']);
        console.log(response);
      }
    )
  }


}
