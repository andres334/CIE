import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { Usuario } from 'src/app/models';
import { AuthService } from '../../services';
import { StorageMap } from '@ngx-pwa/local-storage';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {
  loading = false;
  emailRem = '';
  formData: any = {};
  user: Usuario;

  constructor(private authService: AuthService, private router: Router, private storage: StorageMap) { }

  ngOnInit() {
    this.storage.get('email').subscribe((data) => {
      this.formData.email = data;
      this.formData.rememberMe = true;
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.loading = true;
    const { email, password, rememberMe } = this.formData;
    this.authService.logIn(email, password).subscribe(
      data => {
        this.loading = false;
        if (data['data']) {
          this.user = data['data'];
          this.recuerdame(rememberMe, email);
          notify('Bienvenido ' + this.user.nombreUsuario + '...!', 'success', 2000);
        } else {
          this.loading = false;
          console.log(data['message']);
          notify(data['message'], 'error', 2000);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  recuerdame(rememberMe: boolean, email: string) {
    (rememberMe) ?
      this.storage.set('email', email).subscribe(() => { })
      :
      this.storage.delete('email').subscribe(() => { });
  }

  onCreateAccountClick = () => {
    this.router.navigate(['/create-account']);
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent]
})
export class LoginFormModule { }
