import { Factura } from "./factura";

export class Habitaciones {

    codHabitacion?: number;
    nombreHabitacion!: string;
    descripHabitacion!: string;
    numHabitacion!: number;
    pisoHabitacion!: number;
    maxPersonasDisponibles!: number;
    precioDia!: number;
    estadoHabitacion!: string;
    imagenHabitacion!: string;
   

 
    constructor(nombreHabitacion: string, descriHabitacion: string, numHabitacion: number, pisoHabitacion: number, 
                maxPersonasDisponibles: number, precioDia: number, estadoHabitacion: string) {
                    nombreHabitacion = nombreHabitacion;
                    descriHabitacion = descriHabitacion;
                    numHabitacion = numHabitacion;
                    pisoHabitacion = pisoHabitacion;
                    maxPersonasDisponibles = maxPersonasDisponibles;
                    precioDia = precioDia;
                    estadoHabitacion = estadoHabitacion;
    }

}
