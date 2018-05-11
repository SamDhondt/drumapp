import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrumComponent } from './drum/drum.component';
import { DrummerComponent } from './drummer/drummer.component';
import { MetronomeComponent } from './metronome/metronome.component';
import { PracticeSessionComponent } from './practice-session/practice-session.component';
import { RudimentComponent } from './rudiment/rudiment.component';
import { RudimentListComponent } from './rudiment-list/rudiment-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DrumDataService } from './drum-data.service';
import { Routes, RouterModule } from '@angular/router';
import { RudimentFilterPipe } from './rudiment-filter.pipe';
import { DrummerDetailComponent } from './drummer-detail/drummer-detail.component';
import { DrummerResolver } from './drummer-resolver';
import { httpInterceptorProviders, basehttpInterceptorProviders } from '../http-interceptors';
import { AuthenticationService } from '../user/authentication.service';

const appRoutes: Routes = [
  { path: "practice", component: DrumComponent }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    DrumComponent,
    DrummerComponent,
    MetronomeComponent,
    PracticeSessionComponent,
    RudimentComponent,
    RudimentListComponent,
    RudimentFilterPipe,
  ],
  providers: [
    DrumDataService,
    DrummerResolver,
    httpInterceptorProviders,
    basehttpInterceptorProviders
  ]
})
export class DrumModule { }
