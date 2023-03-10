import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {ContainerComponent} from './container/container.component';
import {APP_CONFIG, APP_SERVICE_CONFIG} from "./AppConfig/appconfig.service";
import {RequestInterceptor} from "./request.interceptor";
import {InitService} from "./init.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SiteNavComponent} from './site-nav/site-nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NotfoundComponent} from './notfound/notfound.component';

import {InputComponent} from './input/input.component';
import {FormsModule} from "@angular/forms";
import {LoginComponent} from './login/login.component';
import {HoverDirective} from './hover.directive';
import {EmailValidatorDirective} from './emailValidator/email-validator.directive';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RouteConfigToken} from "./services/routeConfig.service";
import {GlobalErrorHandler} from "./errorhandler.service";

function initFactory(initService: InitService) {
  return () => initService.init(); // This is the function that will be called when the app starts (APP_INITIALIZER)
}

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    SiteNavComponent,
    InputComponent,
    LoginComponent,
    HoverDirective,
    EmailValidatorDirective,
    NotfoundComponent,
  ],
  imports: [
    // RoomsModule, // This is the module that will be lazy loaded (see app-routing.module.ts)
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG
    },
    {
      provide: RouteConfigToken,
      useValue: {title: 'Home'}
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor, // This is the interceptor that can be used to intercept requests
      multi: true
    },
    {
      provide: APP_INITIALIZER, // This is the function that will be called when the app starts
      useFactory: initFactory,
      deps: [InitService],
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
