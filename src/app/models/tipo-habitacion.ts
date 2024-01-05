export class TipoHabitacion {
    codTipoHabitacion?: number;
    nombre!: string;
    precioDia!: number;

    constructor(nombre:string, precioDia:number){
        this.nombre = nombre;
        this.precioDia = precioDia;

    }
}
