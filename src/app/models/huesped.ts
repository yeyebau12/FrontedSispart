import { Checkin } from "./checkin";
import { Factura } from "./factura";
import { Habitaciones } from "./habitaciones";
import { Nacionalidad } from "./nacionalidad";
import { Region } from "./region";
import { TipoDocumento } from "./tipo-documento";

export class Huesped {

    codHuesped?: number;
    nombre!: string;
    apellido!: string;
    numCelular!: number;
    correo!: string;
    tipoDocumento!: TipoDocumento;
    numDocumento!: number;
    fechaNacimiento!: Date;
    edad!:number;
    nacionalidad: Nacionalidad;
    lugarOrigen!: Region;
    nomContactoEmergencia!: string;
    numContactoEmergencia!: number;
    estadoHuesped: boolean = true;
    checkin: Array<Checkin> = [];


    constructor(nombre: string, apellido: string,  numCelular: number,
        correo: string, tipoDocumento: TipoDocumento, numDocumento: number, fechaNacimiento: Date,nacionalidad: Nacionalidad,
        lugarOrigen: Region, nomContactoEmergencia: string, numContactoEmergencia: number) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.numCelular = numCelular;
        this.correo = correo;
        this.tipoDocumento = tipoDocumento;
        this.numDocumento = numDocumento;
        this.fechaNacimiento = fechaNacimiento;
        this.nacionalidad = nacionalidad;
        this.lugarOrigen = lugarOrigen;
        this.nomContactoEmergencia = nomContactoEmergencia;
        this.numContactoEmergencia = numContactoEmergencia;

    }





}
