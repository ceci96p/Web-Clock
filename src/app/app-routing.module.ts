import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TimerComponent } from './timer/timer.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';

const routes: Routes = [
  { path: 'timer', component: TimerComponent },
  { path: 'stopwatch', component: StopwatchComponent },
  { path: '', redirectTo: '/stopwatch', pathMatch: 'full' }
];

export const appRoutingModule = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
