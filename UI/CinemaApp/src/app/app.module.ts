import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Youtube} from '../pipes/youtube'
import { AppComponent } from './app.component';
import {CinemaService} from "./cinema.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {authInterceptorProviders} from "./auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    Youtube
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
