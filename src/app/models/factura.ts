
import { Huesped } from "./huesped";
import { ItemFactura } from "./item-factura";

export class Factura {

    codFactura!: number;
    descripcion!: string;
    itemFactura: Array<ItemFactura> = [];
    huesped!: Huesped;
    estado!: string;
    total!: number;
    fechaCreacion!: string;
    horaCreacion!: string;

    constructor() { }

    calcularTotal(): number {
        this.total = 0;
        this.itemFactura.forEach((item: ItemFactura) => {
            this.total += item.calcularSubTotal();
        });

        return this.total;
    }
    /* constructor(descripcion: string, itemFactura: Array<ItemFactura>,huesped:Huesped, estado:string){
 
         descripcion = descripcion;
         itemFactura = itemFactura;
         huesped = huesped;
         estado = estado;
 
     }*/
}
