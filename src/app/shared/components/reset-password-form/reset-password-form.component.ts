import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';

const notificationText = 'Hemos enviado un link a tu correo para reestablecer la contraseña.';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent {
  loading = false;
  formData: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit(e) {
    e.preventDefault();
    const { email } = this.formData;
    this.loading = true;

    const result = await this.authService.resetPassword(email);
    this.loading = false;

    if (result.isOk) {
      this.router.navigate(['/login-form']);
      notify(notificationText, 'success', 2500);
    } else {
      notify(result.message, 'error', 2000);
    }
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [ResetPasswordFormComponent],
  exports: [ResetPasswordFormComponent]
})
export class ResetPasswordFormModule { }
