import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {ApiService} from "./services/api.service";
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {SocketService} from "./services/socket.service";
import { SectionComponent } from './section/section.component';
import { HomeComponent } from './home/home.component';
import { ConveyorComponent } from './conveyor/conveyor.component';
import { AlertsComponent } from './alerts/alerts.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    HomeComponent,
    ConveyorComponent,
    AlertsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [ApiService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
