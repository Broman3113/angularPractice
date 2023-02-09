import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomsComponent} from "./rooms/rooms.component";
import {HeaderComponent} from "./header/header.component";

const routes: Routes = [
  {path: '', redirectTo: 'rooms', pathMatch: 'full'},
  {path: 'rooms', component: RoomsComponent},
  {path: 'header', component: HeaderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
