import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Youtube} from '../pipes/youtube'
import { AppComponent } from './app.component';
import {CinemaService} from "./cinema.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

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
  providers: [CinemaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
