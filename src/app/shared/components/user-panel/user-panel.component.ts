import {
  Component,
  NgModule,
  Input,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxListModule } from 'devextreme-angular/ui/list';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { Usuario } from '../../../models';
import { MainPipe } from '../../../main-pipe.module';
import { AuthService } from '../../services';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-user-panel',
  templateUrl: 'user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit, AfterViewInit {
  @Input()
  menuItems: any;

  @Input()
  menuMode: string;

  user: Usuario;

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.authService.getUser().subscribe((data) => {
      if (data['data']) {
        this.user = data['data'];
      } else {
        notify(data['message'], 'error', 2000);
      }
    });
  }
}

@NgModule({
  imports: [DxListModule, DxContextMenuModule, CommonModule, MainPipe],
  declarations: [UserPanelComponent],
  exports: [UserPanelComponent],
})
export class UserPanelModule { }
