import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  getQuery(query: string) {
    return this.http.get(`https://cie.electroao.com/WSCIE/${query}`,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  }

  getDocumentos() {
    return this.getQuery(`Pedido/ObtenerDocumentos?token=${this.authService.getToken()}`).pipe(map(
      resp => {
        if (resp['result'] === -1) {
          localStorage.removeItem('token');
          this.router.navigate(['/login-form']);
        } else if (resp['result'] === 1) {
          resp['data'] = JSON.parse(resp['data']);
        }
        return resp;
      }
    ));
  }

  getProductos() {
    return this.getQuery(`Pedido/ObtenerProductos?token=${this.authService.getToken()}`).pipe(map(
      resp => {
        if (resp['result'] === -1) {
          localStorage.removeItem('token');
          this.router.navigate(['/login-form']);
        } else if (resp['result'] === 1) {
          resp['data'] = JSON.parse(resp['data']);
        }
        return resp;
      }
    ));
  }

  getDatos(producto: string) {
    return this.getQuery(`Pedido/ObtenerLista?token=${this.authService.getToken()}&producto=${producto}`).pipe(map(
      resp => {
        if (resp['result'] === -1) {
          localStorage.removeItem('token');
          this.router.navigate(['/login-form']);
        } else if (resp['result'] === 1) {
          resp['data'] = JSON.parse(resp['data']);
        }
        return resp;
      }
    ));
  }
}
