import { Nacionalidad } from "./nacionalidad";

export class Region {


    codRegion?: number;
    nacionalidad!: Nacionalidad
    nombre!: string;

    constructor(nombre: string, nacionalidad: Nacionalidad) {
        this.nombre = nombre;
        this.nacionalidad = nacionalidad;
    }
}
