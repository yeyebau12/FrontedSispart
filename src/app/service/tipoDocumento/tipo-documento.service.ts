import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  private urlEndPoint: string = environment.url + 'tipoDocumento/'
 

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient, private router: Router) { }

  public listarTipoDocumentos():Observable<TipoDocumento[]>{
    return this.http.get(this.urlEndPoint + 'listarTipoDocumentos').pipe(
      map(response =>{ 
        let tipoDocumentos = response as TipoDocumento[];
        return tipoDocumentos.map(tipoDocumento =>{
          tipoDocumento.nomTipoDocumento = tipoDocumento.nomTipoDocumento.toUpperCase();

          return tipoDocumento;
        });
      })
    );
  }
}
