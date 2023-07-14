export class Nacionalidad {

    codNacion?:number;
    nombre!:string;

    constructor( nombre:string, id?:number) {
        this.nombre = nombre;
    }
}
