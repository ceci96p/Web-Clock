import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';

import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import {FormsModule} from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    StopwatchComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatRippleModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    AppRoutingModule,
  ],
  exports: [RouterModule,TimerComponent,StopwatchComponent,
  ],
    
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
