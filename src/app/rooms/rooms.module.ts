import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoomsRoutingModule} from './rooms-routing.module';
import {RoomsComponent} from "./rooms.component";
import {RoomsListComponent} from "./rooms-list/rooms-list.component";
import {RoomsBookingComponent} from "./rooms-booking/rooms-booking.component";
import {RoomsAddComponent} from "./rooms-add/rooms-add.component";
import {HeaderModule} from "../header/header.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {RouterOutlet} from "@angular/router";
import {RouteConfigToken} from "../services/routeConfig.service";
import {MatInputModule} from "@angular/material/input";
import { FilterPipe } from './filter.pipe';


@NgModule({

  declarations: [
    RoomsComponent,
    RoomsListComponent,
    RoomsBookingComponent,
    RoomsAddComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    FormsModule,
    HeaderModule,
    MatProgressSpinnerModule ,
    MatButtonModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [
    {
      provide: RouteConfigToken,
      useValue: {title: 'Room'}
    }
  ]
})
export class RoomsModule {
}
