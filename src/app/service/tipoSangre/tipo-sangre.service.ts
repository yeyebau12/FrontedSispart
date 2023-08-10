import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { TipoSangre } from 'src/app/models/tipo-sangre';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TipoSangreService {

  private urlEndPoint: string = 'http://localhost:5000/tipoSangre/';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,private authService: AuthService, private router: Router) { }

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

  public listarTipoSangre():Observable<TipoSangre[]>{
    return this.http.get(this.urlEndPoint + 'listarTiposSangre',{ headers: this.addAuthorizationHeader() }).pipe(
      map(response =>{ 
        let tipoSangre = response as TipoSangre[];
        return tipoSangre.map(tipoSangre =>{
          tipoSangre.nomTipoSangre = tipoSangre.nomTipoSangre.toUpperCase();

          return tipoSangre;
        });
      })
    );
  }
}
