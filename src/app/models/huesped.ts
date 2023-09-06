import { Factura } from "./factura";
import { Nacionalidad } from "./nacionalidad";
import { TipoDocumento } from "./tipo-documento";

export class Huesped {

    codHuesped?: number;
    nombre!: string;
    apellido!: string;
    direccion!: string;
    numCelular!: number;
    correo!: string;
    tipoDocumento!: TipoDocumento;
    numDocumento!: number;
    nacionalidad!: Nacionalidad;
    lugarOrigen!: string;
    nomContactoEmergencia!: string;
    numContactoEmergencia!: number;
    estadoHuesped: boolean = true;
    facturas: Array<Factura>=[];

    constructor(nombre: string, apellido: string, direccion: string, numCelular: number,
        correo: string, tipoDocumento: TipoDocumento, numDocuments: number, nacionalidad: Nacionalidad,
        lugarOrigen: string, nomContactoEmergencia: string, numContactoEmergencia: number) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.numCelular = numCelular;
        this.correo = correo;
        this.tipoDocumento = tipoDocumento;
        this.numDocumento = numDocuments;
        this.nacionalidad = nacionalidad;
        this.lugarOrigen = lugarOrigen;
        this.nomContactoEmergencia = nomContactoEmergencia;
        this.numContactoEmergencia = numContactoEmergencia;
    }





}
