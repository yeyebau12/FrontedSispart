import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Nacionalidad } from 'src/app/models/nacionalidad';
import { environment } from 'src/environments/environment';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadService {

  private urlEndPoint: string = environment.url + 'nacionalidad/'


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

  public listarNacionalidades(): Observable<Nacionalidad[]> {
    return this.http.get(this.urlEndPoint + 'listarNacionalidades', { headers: this.addAuthorizationHeader() }).pipe(
      catchError(e => {
        this.isNotAuthenticaction(e);
        return throwError(e);
      }),
      map(response => {
        let nacionalidades = response as Nacionalidad[];
        return nacionalidades.map(nacionalidad => {
          nacionalidad.nombre = nacionalidad.nombre.toUpperCase();

          return nacionalidad;
        });
      })
    );
  }
}
