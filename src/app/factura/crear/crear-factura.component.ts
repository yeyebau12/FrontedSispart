import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, flatMap, map } from 'rxjs';
import { Factura } from 'src/app/models/factura';
import { ItemFactura } from 'src/app/models/item-factura';
import { Producto } from 'src/app/models/producto';
import { CheckInService } from 'src/app/service/checkIn/check-in.service';
import { FacturaServiceService } from 'src/app/service/factura/factura.service';
import { ProductoService } from 'src/app/service/producto/producto.service';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent {

  titulo: string = 'Nueva Factura';
  factura = new Factura();

  autocompleteControl = new FormControl('');

  productosFiltrados!: Observable<Producto[]>;

  constructor(
    private CheckinService: CheckInService, 
    private productoService: ProductoService, 
    private facturaService: FacturaServiceService,
    private router:Router, 
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params: any) => {
      let codCheckin = +params.get('codCheckin');
      this.CheckinService.viewCheckin(codCheckin).subscribe(checkin => this.factura.checkin = checkin);
    });

    this.productosFiltrados = this.autocompleteControl.valueChanges.pipe(

      map((value: any) => typeof value === 'string' ? value : value.nombreProducto),
      flatMap(value => value ? this._filter(value || '') : []),
    );
  }





  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    console.log(filterValue);
    return this.productoService.filtrarProductos(filterValue);

  }

  public createFactura(): void {

    this.facturaService.createFactura(this.factura).subscribe(form => {

      console.log(this.factura);
      this.router.navigate(['/listarCheckin']);
    });
 }

  public mostrarNombre(producto?: Producto): string {

    return producto ? producto.nombreProducto : ''

  }

  public seleccionarProducto(event: MatAutocompleteSelectedEvent): void {

    let producto = event.option.value as Producto;
    console.log(producto);

    if (producto.codProducto !== undefined && this.existItem(producto.codProducto)) {
      this.incrementCantidad(producto.codProducto);
    } else {
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      this.factura.itemFactura.push(nuevoItem);

    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  public actualizarCantidad(codProducto: number, event: any): void {
    let cantidad: number = event.target.value as number;

    if (cantidad == 0) {
      return this.deleteItemFactura(codProducto);
    }

    this.factura.itemFactura = this.factura.itemFactura.map((item: ItemFactura) => {
      if (codProducto === item.producto.codProducto) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  public existItem(codProducto: number): boolean {

    let existItem = false;

    this.factura.itemFactura.forEach((item: ItemFactura) => {
      if (codProducto === item.producto.codProducto) {
        existItem = true;
      }
    });

    return existItem;

  }

  public incrementCantidad(codProducto: number): void {

    this.factura.itemFactura = this.factura.itemFactura.map((item: ItemFactura) => {
      if (codProducto === item.producto.codProducto) {
        ++item.cantidad;
      }
      return item;
    });

  }

  public deleteItemFactura(codProducto: number): void {

    this.factura.itemFactura = this.factura.itemFactura.filter((item: ItemFactura) => codProducto !== item.producto.codProducto);
  }
}
