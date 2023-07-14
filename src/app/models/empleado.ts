import { Sexo } from "./sexo";
import { TipoDocumento } from "./tipo-documento";
import { TipoSangre } from "./tipo-sangre";

export class Empleado {

    codEmpleado?: number;
    nombre!: string;
    apellido!: string;
    tipDocumento!: TipoDocumento;
    numDocumento!: number;
    edad!: number;
    numTelefono!: number;
    correo!: string;
    fechaNacimiento!: Date;
    direccion!: string;
    nomContactoEmergencia!: string;
    numContactoEmergencia!: number;
    eps!: string;
    arl!: string;
    sexo!: Sexo;
    tipoSangre!: TipoSangre;
    fotoEmpleado!: string;

    constructor(nombre: string, apellido: string, tipDocumento: TipoDocumento, numDocumento: number, edad: number,
        numTelefono: number, correo: string, fechaNacimiento: Date, direccion: string, nomContactoEmergencia: string,
        numContactoEmergencia: number, eps: string, arl: string, sexo: Sexo, tipoSangre: TipoSangre) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.tipDocumento = tipDocumento;
        this.numDocumento = numDocumento;
        this.edad = edad;
        this.numTelefono = numTelefono;
        this.correo = correo;
        this.fechaNacimiento = fechaNacimiento;
        this.direccion = direccion;
        this.nomContactoEmergencia = nomContactoEmergencia;
        this.numContactoEmergencia = numContactoEmergencia;
        this.eps = eps;
        this.arl = arl;
        this.sexo = sexo;
        this.tipoSangre = tipoSangre;

    }



}
