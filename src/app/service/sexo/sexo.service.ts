import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Sexo } from 'src/app/models/sexo';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SexoService {

  private urlEndPoint: string = 'https://backendsispart.com.co/sexo/'
  //private urlEndPoint: string = 'http://localhost:5000/sexo/';

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

  public listarSexos(): Observable<Sexo[]> {
    return this.http.get(this.urlEndPoint + 'listarSexo', { headers: this.addAuthorizationHeader() }).pipe(
      map(response => {
        let sexo = response as Sexo[];
        return sexo.map(sexo => {
          sexo.nomSexo = sexo.nomSexo.toUpperCase();

          return sexo;
        });
      })
    );
  }
}
