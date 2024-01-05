import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { Checkin } from 'src/app/models/checkin';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  private urlEndPoint: string = environment.url + 'checkin/'
 
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

  public listarCheckin(page: number): Observable<Checkin[]> {
    return this.http.get(this.urlEndPoint + 'listarCheckin/page/' + page, { headers: this.addAuthorizationHeader() }).pipe(
      catchError(e => {
        this.isNotAuthenticaction(e);
        return throwError(e);
      }),
      map((response: any) => {
        (response.content as Checkin[]).map(checkin => {
          
          return checkin;
        });
        return response;
      })
    );
  }

  
  public createCheckin(checkin:Checkin): Observable<Checkin> {
    return this.http.post<Checkin>(this.urlEndPoint + 'crearCheckin', checkin, { headers: this.addAuthorizationHeader() }).pipe(
      map((response: any) => response.checkin as Checkin),
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


  viewCheckin(codCheckin: any): Observable<Checkin> {
    return this.http.get<Checkin>(`${this.urlEndPoint + 'verCheckin'}/${codCheckin}`, { headers: this.addAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNotAuthenticaction(e)) {
          console.error(e.error.mensaje);
          return throwError(e);
        }
        this.router.navigate(['/listarCheckin']);
        console.error(e.error.mensaje);
        return throwError(e);

      })
    );

  }
}
