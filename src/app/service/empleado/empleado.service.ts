import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { Huesped } from 'src/app/models/huesped';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {


  private urlEndPoint: string = 'http://localhost:5000/empleados/';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient, private router: Router) { }

 public listarEmpleados(page:number): Observable<Empleado[]> {
    return this.http.get(this.urlEndPoint + 'listarEmpleados/page/'+ page).pipe(
      map((response:any) => {
         (response.content as Empleado[]).map(empleado=> {
          empleado.nombre = empleado.nombre.toUpperCase();
          return empleado;
        });
        return response;
      })
    );
  }
}
