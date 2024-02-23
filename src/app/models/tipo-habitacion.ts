export class TipoHabitacion {
  codTipoHabitacion?: number;
  nombre!: string;
  precioXPersona!: number;

  constructor(nombre: string, precioXPersona: number) {
    this.nombre = nombre;
    this.precioXPersona = precioXPersona;
  }
}
