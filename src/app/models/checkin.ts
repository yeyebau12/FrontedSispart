import { Factura } from "./factura";
import { Habitaciones } from "./habitaciones";
import { Huesped } from "./huesped";

export class Checkin {
    codCheckin?: number;
    fechaEntrada!: Date;
	fechaSalida!: Date;
	codHuesped !:Huesped;
	codHabitacion!: Habitaciones;
	facturas: Array<Factura> = [];

    constructor(){
       
        
    }


	
}
