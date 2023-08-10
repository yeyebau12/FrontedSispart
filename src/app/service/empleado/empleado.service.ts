import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { AuthService } from '../login/auth.service';
import { DatePipe, formatDate, registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es-CO'

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {


  private urlEndPoint: string = 'http://localhost:5000/empleados/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private addAuthorizationHeader() {

    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    return this.httpHeaders;

  }
  private isNotAuthenticaction(e: any): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login']);
      return true;

    }
    return false;

  }

  public listarEmpleados(page: number): Observable<Empleado[]> {
    return this.http.get(this.urlEndPoint + 'listarEmpleados/page/' + page, { headers: this.addAuthorizationHeader() }).pipe(
      catchError(e => {
        this.isNotAuthenticaction(e);
        return throwError(e);
      }),
      map((response: any) => {
        (response.content as Empleado[]).map(empleado => {
          empleado.nombre = empleado.nombre.toUpperCase();
          return empleado;
        });
        return response;
      })
    );
  }

  createEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.urlEndPoint + 'crearEmpleado', empleado, { headers: this.addAuthorizationHeader() }).pipe(
      map((response: any) => response.empleado as Empleado),
      catchError(e => {
        if (this.isNotAuthenticaction(e)) {
          console.error(e.error.mensaje);
          return throwError(e);
        }
        console.error(e.error.message);
        return throwError(e);

      })
    );
  }

  viewEmpleado(codEmpleado: any): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.urlEndPoint + 'verEmpleado'}/${codEmpleado}`, { headers: this.addAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNotAuthenticaction(e)) {
          console.error(e.error.mensaje);
          return throwError(e);
        }
        this.router.navigate(['/listarEmpleados']);
        console.error(e.error.mensaje);
        return throwError(e);

      })
    );

  }

  updateEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.urlEndPoint + 'actualizarEmpleado'}/${empleado.codEmpleado}`, empleado, { headers: this.addAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNotAuthenticaction(e)) {
          console.error(e.error.mensaje);
          return throwError(e);
        }
        this.router.navigate(['/listarEmpleados']);
        console.error(e.error.mensaje);
        return throwError(e);

      }
      )
    )


  }

  public deleteEmpleado(codEmpleado: any): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint + 'eliminarEmpleado'}/${codEmpleado}`, { headers: this.addAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNotAuthenticaction(e)) {
          console.error(e.error.mensaje);
          return throwError(e);
        }
        console.error(e.error.mensaje);
        return throwError(e);

      }
      )
    );

  }
}
