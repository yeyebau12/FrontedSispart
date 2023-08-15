export class Habitaciones {

    codHabitacion?: number;
    nombreHabitacion!: string;
    descripHabitacion!: string;
    numHabitacion!: number;
    pisoHabitacion!: number;
    maxPersonasDisponibles!: number;
    precioHabitacion!: number;
    estadoHabitacion!: string;
    imagenHabitacion!: string;

    constructor(nombreHabitacion: string, descriHabitacion: string, numHabitacion: number, pisoHabitacion: number, 
                maxPersonasDisponibles: number, precioHabitacion: number, estadoHabitacion: string) {
                    nombreHabitacion = nombreHabitacion;
                    descriHabitacion = descriHabitacion;
                    numHabitacion = numHabitacion;
                    pisoHabitacion = pisoHabitacion;
                    maxPersonasDisponibles = maxPersonasDisponibles;
                    precioHabitacion = precioHabitacion;
                    estadoHabitacion = estadoHabitacion;
    }
}
