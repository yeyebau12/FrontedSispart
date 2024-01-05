import { Producto } from "./producto";

export class ItemFactura {
    cantidad: number = 1;
    producto!: Producto;
    subtotal!: number;
    cantidadTotal!: number;


    constructor(){}
/*  constructor(cantidad: number, producto: Producto) {

        cantidad = cantidad;
        producto = producto;
  }*/

    public calcularSubTotal(): number {
        return this.cantidad * this.producto.precio;
    }

    public calcCantidadTotal(): number {
        return  this.producto.cantidad - this.cantidad;
    }
}
