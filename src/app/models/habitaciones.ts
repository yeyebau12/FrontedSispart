
import { EstadoHabitacion } from "./estado-habitacion";
import { TipoHabitacion } from "./tipo-habitacion";

export class Habitaciones {

    codHabitacion?: number;
    nombreHabitacion!: TipoHabitacion;
    descripHabitacion!: string;
    numHabitacion!: number;
    pisoHabitacion!: number;
    maxPersonasDisponibles!: number;
    estadoHabitacion!: EstadoHabitacion;
    imagenHabitacion!: string;
   

 
    constructor(nombreHabitacion: TipoHabitacion, descriHabitacion: string, numHabitacion: number, pisoHabitacion: number, 
                maxPersonasDisponibles: number, estadoHabitacion: EstadoHabitacion) {
                    nombreHabitacion = nombreHabitacion;
                    descriHabitacion = descriHabitacion;
                    numHabitacion = numHabitacion;
                    pisoHabitacion = pisoHabitacion;
                    maxPersonasDisponibles = maxPersonasDisponibles;
                    estadoHabitacion = estadoHabitacion;
    }

}
