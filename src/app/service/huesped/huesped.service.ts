import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Huesped } from 'src/app/models/huesped';
import { AuthService } from '../login/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HuespedService {

  private urlEndPoint: string = environment.url + 'huespedes/'
 

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

  public listarHuespedes(page: number): Observable<Huesped[]> {
    return this.http.get(this.urlEndPoint + 'listarHuespedes/page/' + page, { headers: this.addAuthorizationHeader() }).pipe(
      catchError(e => {
        this.isNotAuthenticaction(e);
        return throwError(e);
      }),
      map((response: any) => {
        (response.content as Huesped[]).map(huesped => {
          huesped.nombre = huesped.nombre.toUpperCase();
          return huesped;
        });
        return response;
      })
    );
  }

  createHuesped(huesped: Huesped): Observable<Huesped> {
    return this.http.post<Huesped>(this.urlEndPoint + 'crearHuesped', huesped, { headers: this.addAuthorizationHeader() }).pipe(
      map((response: any) => response.huesped as Huesped),
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

  viewHuesped(codHuesped: any): Observable<Huesped> {
    return this.http.get<Huesped>(`${this.urlEndPoint + 'verhuesped'}/${codHuesped}`, { headers: this.addAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNotAuthenticaction(e)) {
          console.error(e.error.mensaje);
          return throwError(e);
        }
        this.router.navigate(['/listarHuespedes']);
        console.error(e.error.mensaje);
        return throwError(e);

      })
    );

  }

  updateHuesped(huesped: Huesped): Observable<Huesped> {
    return this.http.put<Huesped>(`${this.urlEndPoint + 'actualizarHuesped'}/${huesped.codHuesped}`, huesped, { headers: this.addAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNotAuthenticaction(e)) {
          console.error(e.error.mensaje);
          return throwError(e);
        }
        this.router.navigate(['/listarHuespedes']);
        console.error(e.error.mensaje);
        return throwError(e);

      }
      )
    )


  }

  public deleteHuesped(codHuesped: any): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint + 'eliminarhuesped'}/${codHuesped}`, { headers: this.addAuthorizationHeader() }).pipe(
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
