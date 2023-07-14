import { TipoDocumento } from "./tipo-documento";

export class UsuarioEmpleado {

    codUserEmpleado?: number;
    tipDocumento!: TipoDocumento;
    numDocumento!: number;
    userName!: string;
    contrasena!: string;
    confirContrasena!: string;
    enabled: boolean = true;
    rol: string[] = [];

    

}
