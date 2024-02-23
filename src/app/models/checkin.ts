import { Factura } from './factura';
import { Habitaciones } from './habitaciones';
import { Huesped } from './huesped';

export class Checkin {
  codCheckin?: number;
  fechaEntrada!: Date;
  fechaSalida!: Date;
  codHuesped!: Huesped;
  codHabitacion!: Habitaciones;
  numAdultos: number = 0;
  numNinos: number = 0;
  facturas: Array<Factura> = [];
  total: number = 0;

  constructor() {}

  calcularTotal(): void {
    if (this.codHabitacion) {
      this.total = this.codHabitacion.nombreHabitacion.precioXPersona;
    }
  }

  calcularAcompanantes(): number {
    return (this.numAdultos + this.numNinos) * this.total;
  }
}
