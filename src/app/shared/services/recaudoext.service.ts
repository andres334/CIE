import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { RecaudoExt } from '../../models/recaudoext.model';

@Injectable({
  providedIn: 'root'
})
export class RecaudoextService {

  public domparser = new DOMParser();
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  getQuery(query: string){
    return this.http.get(`https://cie.electroao.com/WSCIE/${query}`,
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  postQuery(query: string, body: any){
    return this.http.post(`https://cie.electroao.com/WSCIE/${query}`, body,
    { headers: { 'Content-Type': 'application/json' }});
  }

  getFactura(codigo: string){
    return this.getQuery(`RecaudoExt/ObtenerCodigo?token=${this.authService.getToken()}&codigo=${codigo}`).pipe( map( resp => {
      if (resp['result'] === -1) {
        localStorage.removeItem('token');
        this.router.navigate(['/login-form']);
      }else if (resp['result'] === 1){
        resp['data'] = resp['data']['consultar-recaudos-output'];
      }
      return resp;
    }));
  }

  getDatosEntidad(){
    return this.getQuery(`RecaudoExt/ObtenerEntidad?token=${this.authService.getToken()}`).pipe( map( resp => {
      if (resp['result'] === -1) {
        localStorage.removeItem('token');
        this.router.navigate(['/login-form']);
      }
      return resp;
    }));
  }

  postRecaudo(recaudoExt: RecaudoExt){
    return this.postQuery(`RecaudoExt/Guardar?token=${this.authService.getToken()}`, recaudoExt).pipe(map( resp => {
      if (resp['result'] === -1) {
        localStorage.removeItem('token');
        this.router.navigate(['/login-form']);
      }
      return resp;
    }));
  }
}
