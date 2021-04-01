import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent, DocumentViewerComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { RecaudoextComponent } from './pages/recaudoext/recaudoext.component';
import { MainPipe } from './main-pipe.module';
import { DxDataGridModule, DxFormModule, DxCheckBoxModule, DxPopupModule, DxButtonModule, DxLoadIndicatorModule,
DxBoxModule } from 'devextreme-angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

const routes: Routes = [
  {
    path: 'recaudoext',
    component: RecaudoextComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'document-viewer',
    component: DocumentViewerComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule, MainPipe, DxDataGridModule, DxFormModule, DxCheckBoxModule,
    DxPopupModule, DxButtonModule, DxLoadIndicatorModule, DxBoxModule, ZXingScannerModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, ProfileComponent, TasksComponent, ProductosComponent, RecaudoextComponent]
})
export class AppRoutingModule { }
