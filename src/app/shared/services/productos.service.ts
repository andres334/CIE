import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  datasource: any;
  constructor( private http : HttpClient , private authService : AuthService) { }

  getQuery(query: string){
    return this.http.get(`https://cie.electroao.com/WSAO/API/${query}`,
    { headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  getCategorias () {
    return this.getQuery(`Producto?token=${this.authService.getToken()}`).pipe( map (
      resp => {
        if(resp['data']){
          this.datasource = resp['data'];
          return resp;
        }
      }
    ));
  }

}
