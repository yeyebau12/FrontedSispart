export class Producto {
    codProducto?: number
    nombreProducto!: string;
    marca!: string;
    cantidad!: number;
    precio!: number;
    fechaRegistro!: Date;
    horaRegistro!: Date;

    constructor(nombreProducto: string, marca: string, cantidad: number, precio: number){
        nombreProducto = nombreProducto;
        marca = marca;
        cantidad = cantidad;
        precio = precio;

    }


}
