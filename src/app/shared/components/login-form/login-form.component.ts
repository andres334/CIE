import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { Usuario } from 'src/app/models';
import { AuthService } from '../../services';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {
  loading = false;
  emailRem = '';
  formData: any = {};
  user : Usuario ;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(){
    if(localStorage.getItem('email')){
      this.formData.email = localStorage.getItem('email');
      this.formData.rememberMe = true;
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.loading = true;
    const { email, password , rememberMe } = this.formData;
    this.authService.logIn(email,password).subscribe(
      data => {
        this.loading = false;
        if(data['data']){
          this.user = data['data'];
          this.recuerdame(rememberMe,email);
          notify('Bienvenido '+this.user.nombreUsuario+ '...!', 'success', 2000);
          this.router.navigate(['/home']);
        }else{
          this.loading = false;
          console.log(data['message']);
          notify(data['message'], 'error', 2000);
        }
      },
      error => {
        console.log(error.error.text);
      }
    );
  }

  recuerdame(rememberMe : boolean, email: string){
    (rememberMe) ?
    localStorage.setItem('email',email)
    :
    localStorage.removeItem('email')
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
  declarations: [ LoginFormComponent ],
  exports: [ LoginFormComponent ]
})
export class LoginFormModule { }
