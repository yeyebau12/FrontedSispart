export class TipoDocumento {

    codTipoDocumento?: number;
    nomTipoDocumento!: string;

    constructor(nomTipoDocumento: string) {
        this.nomTipoDocumento = nomTipoDocumento;
    }
}
