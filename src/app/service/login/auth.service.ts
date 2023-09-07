import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioEmpleado } from 'src/app/models/usuario-empleado';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuarioEmpleado!: UsuarioEmpleado;
  private _token!: any;

  private urlEndPoint: string = 'https://backendsispart.com.co/oauth/token'
  //private urlEndPoint: string = 'https://localhost:5000/oauth/token';


  constructor(private http: HttpClient, private router: Router) { }

  public get usuarioEmpleado(): UsuarioEmpleado {

    if (this._usuarioEmpleado != null) {
      return this._usuarioEmpleado;
    } else if (this._usuarioEmpleado == null && sessionStorage.getItem('usuarioEmpleado') != null) {
      this._usuarioEmpleado = JSON.parse(sessionStorage.getItem('usuarioEmpleado') || '') as UsuarioEmpleado;
      return this._usuarioEmpleado;
    }

    return new UsuarioEmpleado();
  }

  public get token(): any {
    if (this._token != null) {
      return this._token;
    }
    else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      
      return this._token;
    }
    console.log ('Esperando Autenticacion...!')
    return null;

  }

  public login(usuarioEmpleado: UsuarioEmpleado): Observable<any> {
    let params = new URLSearchParams();
    const credenciales = btoa('angularapp' + ':' + 'angu1234lar');
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + credenciales });

    params.set('grant_type', 'password');
    params.set('username', usuarioEmpleado.userName);
    params.set('password', usuarioEmpleado.contrasena);

    console.log(params.toString());

    return this.http.post<any>(this.urlEndPoint, params.toString(), { headers: httpHeaders });
  }

  public guardarUser(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._usuarioEmpleado = new UsuarioEmpleado();
    this._usuarioEmpleado.userName = payload.user_name;
    this._usuarioEmpleado.numDocumento = payload.numero_documento;
    this._usuarioEmpleado.rol = payload.authorities;

    sessionStorage.setItem('usuarioEmpleado', JSON.stringify(this._usuarioEmpleado));

  }

  public guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  public obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  public isAuthenticated(): boolean {

    let payload = this.obtenerDatosToken(this.token);
    
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }
}
