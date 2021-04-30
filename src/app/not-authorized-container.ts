import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SingleCardModule } from 'src/app/layouts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-authorized-container',
  template: `
    <app-single-card [title]="title" [description]="description">
      <router-outlet></router-outlet>
    </app-single-card>
  `,
  styles: [`
    :host {
      width: 100%;
      height: 100%;
    }
  `]
})
export class NotAuthorizedContainerComponent {

  constructor(private router: Router) { }

  get title() {
    const path = this.router.url.split('/')[1];
    switch (path) {
      case 'login-form': return 'Ingreso';
      case 'reset-password': return 'Recuerda tu Contraseña';
      case 'create-account': return 'Registro';
      case 'change-password': return 'Cambiar Contraseña';
      case 'document-viewer': return 'Visor de Reportes';
    }
  }

  get description() {
    const path = this.router.url.split('/')[1];
    switch (path) {
      case 'reset-password': return 'Por favor ingresa la direccion de correo de tu cuenta de usuario, y te enviaremos link a tu correo para continuar con el proceso.';
    }
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SingleCardModule,
  ],
  declarations: [NotAuthorizedContainerComponent],
  exports: [NotAuthorizedContainerComponent]
})
export class NotAuthorizedContainerModule { }
