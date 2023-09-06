import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Factura } from 'src/app/models/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaServiceService {

  private urlEndPoint: string = 'http://localhost:5000/factura/';

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


  public createFactura(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.urlEndPoint + 'crearFactura', factura, { headers: this.addAuthorizationHeader() }).pipe(
      map((response: any) => response.factura as Factura),
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


  public viewFactura(codFactura: any): Observable<Factura> {
    return this.http.get<Factura>(`${this.urlEndPoint + 'verFactura'}/${codFactura}`, { headers: this.addAuthorizationHeader() }).pipe(
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

  public deleteFactura(codFactura: any): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint + 'eliminarFactura'}/${codFactura}`, { headers: this.addAuthorizationHeader() }).pipe(
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
