import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { Usuario } from 'src/app/models';
import { AuthService } from '../../services';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loading = false;
  emailRem = '';
  formData: any = {};
  user: Usuario ;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: StorageMap
  ) {}

  ngOnInit(){
    if (localStorage.getItem('email')){
      this.formData.email = localStorage.getItem('email');
      this.formData.rememberMe = true;
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.loading = true;
    const { email, password , rememberMe } = this.formData;
    this.authService.logIn(email, password).subscribe(
      (data) => {
        console.log(data);
        if (data['data']) {
          this.user = data['data'];
          this.recuerdame(rememberMe, email);
          this.storage.set('user', this.user).subscribe(() => {
            this.authService.getOpciones().subscribe((options) => {
              this.storage.set('options', options).subscribe(() => {
                this.router.navigate([this.authService._lastAuthenticatedPath]);
              });
            });
          });
          notify( 'Bienvenido ' + this.user.nombreUsuario + '...!', 'success', 2000);
          this.loading = false;
        } else {
          this.storage.set('options', []).subscribe(() => {});
          this.storage.set('user', []).subscribe(() => {});
          this.loading = false;
          console.log(data['message']);
          notify(data['message'], 'error', 2000);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  recuerdame(rememberMe: boolean, email: string) {
    rememberMe
      ? this.storage.set('email', email).subscribe(() => {})
      : this.storage.delete('email').subscribe(() => {});
  }

  onCreateAccountClick = () => {
    this.router.navigate(['/create-account']);
  }
}
@NgModule({
  imports: [CommonModule, RouterModule, DxFormModule, DxLoadIndicatorModule],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
})
export class LoginFormModule {}
