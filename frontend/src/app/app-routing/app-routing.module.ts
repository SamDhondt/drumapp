import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthGuardService } from '../user/auth-guard.service';

const appRoutes: Routes = [ 
  { 
    path: "drum", 
    canActivate: [ AuthGuardService ],
    loadChildren: "app/drum/drum.module#DrumModule"
  },
  { path: '', redirectTo: "drum/practice", pathMatch: "full"},
  { path: '**', component: PageNotFoundComponent}
 ];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
