import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {NotfoundComponent} from "./notfound/notfound.component";
import {LoginComponent} from "./login/login.component";
import {RoomsAddComponent} from "./rooms/rooms-add/rooms-add.component";
import {LoginGuard} from "./guards/login.guard";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'rooms/add',
    component: RoomsAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'rooms',
    loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule), // Lazy loading module
    canActivate: [LoginGuard],
    canLoad: [LoginGuard]
  },
  {path: 'header', component: HeaderComponent},
  {
    path: '404-not-found',
    loadChildren: () => import('./notfound/notfound.module').then(m => m.NotfoundModule) // Lazy loading module
  },
  {
    path: 'booking/:id',
    loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule), // ng g m booking --route=booking --routing --module=app
    // canActivate: [LoginGuard]
  },
  { path: 'comment', loadChildren: () => import('./comment/comment.module').then(m => m.CommentModule) },
  {path: '**', redirectTo: '/404-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
