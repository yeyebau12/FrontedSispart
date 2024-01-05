import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Region } from 'src/app/models/region';
import { environment } from 'src/environments/environment';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private urlEndPoint: string = environment.url + 'region/'

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

  public listarRegionesByNacionalidad(codNacionalidad: any): Observable<Region[]> {
    return this.http.get(`${this.urlEndPoint + 'regionByNacion'}/${codNacionalidad}`, { headers: this.addAuthorizationHeader() }).pipe(
      catchError(e => {
        this.isNotAuthenticaction(e);
        return throwError(e);
      }),
      map(response => {
        let regiones = response as Region[];
        return regiones.map(region => {
          region.nombre = region.nombre.toUpperCase();
          return region;
        });
      })
    );
  }
}
