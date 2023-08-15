import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { Habitaciones } from 'src/app/models/habitaciones';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private urlEndPoint: string = 'http://localhost:5000/habitacion/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

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

  public listarHabitaciones(page: number): Observable<Habitaciones[]> {
    return this.http.get(this.urlEndPoint + 'listarHabitaciones/page/' + page, { headers: this.addAuthorizationHeader() }).pipe(
      catchError(e => {
        this.isNotAuthenticaction(e);
        return throwError(e);
      }),
      map((response: any) => {
        (response.content as Habitaciones[]).map(habitacion => {
          habitacion.nombreHabitacion = habitacion.nombreHabitacion.toUpperCase();
          return habitacion;
        });
        return response;
      })
    );
  }

  createHabitacion(habitacion: Habitaciones): Observable<Habitaciones> {
    return this.http.post<Habitaciones>(this.urlEndPoint + 'crearHabitacion', habitacion, { headers: this.addAuthorizationHeader() }).pipe(
      map((response: any) => response.huesped as Habitaciones),
      catchError(e => {
        if (this.isNotAuthenticaction(e)) {
          console.error(e.error.mensaje);
          return throwError(e);
        }
        console.error(e.error.mensaje);
        return throwError(e);

      })
    );
  }

  viewHabitacion(codHabitacion: any): Observable<Habitaciones> {
    return this.http.get<Habitaciones>(`${this.urlEndPoint + 'verHabitacion'}/${codHabitacion}`, { headers: this.addAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNotAuthenticaction(e)) {
          console.error(e.error.mensaje);
          return throwError(e);
        }
        this.router.navigate(['/listarHabitaciones']);
        console.error(e.error.mensaje);
        return throwError(e);

      })
    );

  }

  updateHabitacion(habitacion: Habitaciones): Observable<Habitaciones> {
    return this.http.put<Habitaciones>(`${this.urlEndPoint + 'actualizarHabitacion'}/${habitacion.codHabitacion}`, habitacion, { headers: this.addAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNotAuthenticaction(e)) {
          console.error(e.error.mensaje);
          return throwError(e);
        }
        this.router.navigate(['/listarHabitaciones']);
        console.error(e.error.mensaje);
        return throwError(e);

      }
      )
    )


  }

  public deleteHabitaciones(codHabitacion: any): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint + 'eliminarHabitacion'}/${codHabitacion}`, { headers: this.addAuthorizationHeader() }).pipe(
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
