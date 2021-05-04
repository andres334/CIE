import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor( private http: HttpClient , private authService: AuthService) { }

  getQuery(query: string){
    return this.http.get(`https://cie.electroao.com/WSCIE/${query}`,
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  getCategorias() {
    return this.getQuery(`Producto/Obtener?token=${this.authService.getToken()}`).pipe( map (
      resp => {
        if (resp['data']){
          // this.datasource = resp['data'];
          return resp;
        }
      }
    ));
  }

}
