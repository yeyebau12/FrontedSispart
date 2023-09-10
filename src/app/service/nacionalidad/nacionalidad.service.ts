import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Nacionalidad } from 'src/app/models/nacionalidad';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadService {

  private urlEndPoint: string = environment.url + 'nacionalidad/'
  

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient, private router: Router) { }

  public listarNacionalidades():Observable<Nacionalidad[]>{
    return this.http.get(this.urlEndPoint + 'listarNacionalidades').pipe(
      map(response =>{ 
        let nacionalidades = response as Nacionalidad[];
        return nacionalidades.map(nacionalidad =>{
          nacionalidad.nombre = nacionalidad.nombre.toUpperCase();

          return nacionalidad;
        });
      })
    );
  }
}
