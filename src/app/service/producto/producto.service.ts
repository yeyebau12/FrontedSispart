import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { Producto } from 'src/app/models/producto';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlEndPoint: string = 'https://backendsispart.com.co/producto/'
  //private urlEndPoint: string = 'http://localhost:5000/producto/';

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

  public listarProductos(page: number): Observable<Producto[]> {
    return this.http.get(this.urlEndPoint + 'listarProductos/page/' + page, { headers: this.addAuthorizationHeader() }).pipe(
      catchError(e => {
        this.isNotAuthenticaction(e);
        return throwError(e);
      }),
      map((response: any) => {
        (response.content as Producto[]).map(producto => {
          producto.nombreProducto = producto.nombreProducto.toUpperCase();
          return producto;
        });
        return response;
      })
    );
  }

  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.urlEndPoint + 'crearProducto', producto, { headers: this.addAuthorizationHeader() }).pipe(
      map((response: any) => response.producto as Producto),
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

  viewProducto(codProducto: any): Observable<Producto> {
    return this.http.get<Producto>(`${this.urlEndPoint + 'verProducto'}/${codProducto}`, { headers: this.addAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNotAuthenticaction(e)) {
          console.error(e.error.mensaje);
          return throwError(e);
        }
        this.router.navigate(['/listarProductos']);
        console.error(e.error.mensaje);
        return throwError(e);

      })
    );

  }

  updateProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.urlEndPoint + 'actualizarProducto'}/${producto.codProducto}`, producto, { headers: this.addAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNotAuthenticaction(e)) {
          console.error(e.error.mensaje);
          return throwError(e);
        }
        this.router.navigate(['/listarProductos']);
        console.error(e.error.mensaje);
        return throwError(e);

      }
      )
    )


  }

  public deleteProducto(codProducto: any): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint + 'eliminarProducto'}/${codProducto}`, { headers: this.addAuthorizationHeader() }).pipe(
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

  public filtrarProductos(term:String):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlEndPoint + 'filtrarProducto'}/${term}`, { headers: this.addAuthorizationHeader() }).pipe(
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
