import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const defaultPath = '/';

@Injectable()
export class AuthService {

  get loggedIn(): boolean {
    return (localStorage.getItem('token') ? true : false);
  }

  // tslint:disable-next-line: variable-name
  public _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private http: HttpClient) { }

  // http://localhost/WSCIE/Usuario/LogIn?Id=12412&Clave=1241
  getQuery(query: string){
    return this.http.get(`https://cie.electroao.com/WSCIE/${query}`,
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  postQuery(query: string, body: string[]){
    return this.http.post(`https://cie.electroao.com/WSCIE/${query}`, body,
    { headers: { 'Content-Type': 'application/json' }});
  }

  logIn(codigo: string, password: string) {
    return this.getQuery(`Usuario/LogIn?Id=${codigo}&Clave=${password}`)
    .pipe( map( resp => {
      if (resp['result'] === 1){
        this.setToken(resp['data'].token);
      }else if (resp['result'] === -1) {
        localStorage.removeItem('token');
        this.router.navigate(['/login-form']);
      }
      return resp;
    }));
  }

  getUser() {
    return this.getQuery(`Usuario/Datos?token=${this.getToken()}`).pipe( map( resp => {
      if (resp['result'] === -1) {
        localStorage.removeItem('token');
        this.router.navigate(['/login-form']);
      }
      return resp;
    }));
  }

  getOpciones() {
    return this.getQuery(`Opciones/Obtener?token=${this.getToken()}`).pipe( map( resp => {
      if (resp['result'] === -1) {
        localStorage.removeItem('token');
        this.router.navigate(['/login-form']);
      }
      return resp;
    }));
  }

  getCaja() {
    return this.getQuery(`Usuario/ObtenerCaja?token=${this.getToken()}`).pipe( map( resp => {
      if (resp['result'] === -1) {
        localStorage.removeItem('token');
        this.router.navigate(['/login-form']);
      }
      return resp;
    }));
  }

  getSucursal() {
    return this.getQuery(`Usuario/ObtenerSucursal?token=${this.getToken()}`).pipe( map( resp => {
      if (resp['result'] === -1) {
        localStorage.removeItem('token');
        this.router.navigate(['/login-form']);
      }
      return resp;
    }));
  }

  setToken( token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return (localStorage.getItem('token') ? localStorage.getItem('token') : '');
  }

  async createAccount(email, password) {
    try {
      // Send request
      console.log(email, password);

      this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: 'Failed to create account'
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: 'Failed to change password'
      };
    }
  }

  async resetPassword(email: string) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: 'Failed to reset password'
      };
    }
  }

  async logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login-form']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig.path);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig.path;
    }

    return isLoggedIn || isAuthForm;
  }
}
