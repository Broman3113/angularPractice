import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RoomsComponent} from './rooms/rooms.component';
import {RoomsListComponent} from './rooms/rooms-list/rooms-list.component';
import {HeaderComponent} from './header/header.component';
import {ContainerComponent} from './container/container.component';
import {APP_CONFIG, APP_SERVICE_CONFIG} from "./AppConfig/appconfig.service";
import {RequestInterceptor} from "./request.interceptor";
import {InitService} from "./init.service";

function initFactory(initService: InitService) {
  return () => initService.init(); // This is the function that will be called when the app starts (APP_INITIALIZER)
}
@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    RoomsListComponent,
    HeaderComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
