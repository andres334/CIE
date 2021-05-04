import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule,
   LoginFormModule, DocumentViewerModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService, ProductosService, RecaudoextService, PedidoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { MainPipe } from './main-pipe.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MainPipe,
    BrowserModule,
    CommonModule,
    SideNavOuterToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    DocumentViewerModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService, ScreenService, AppInfoService, ProductosService, RecaudoextService, PedidoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
