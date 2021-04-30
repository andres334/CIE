import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { Usuario } from 'src/app/models';
import { AuthService } from '../../shared/services';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent implements OnInit {
  user: Usuario;
  cargos: [];
  colCountByScreen: object;

  constructor(private authService: AuthService) {
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
  }

  ngOnInit(){
    this.authService.getUser().subscribe(
      data => {
        if (data['data']){
          this.user = data['data'];
        }else{
          notify(data['message'], 'error', 2000);
        }
      }
    );
  }

  getavatarUrl(){
    if (this.user){
      return this.user.avatarUrl;
    }
  }

}
