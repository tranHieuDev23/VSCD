import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './view/pages/home-page/home-page.component';
import { SpeakPageComponent } from './view/pages/speak-page/speak-page.component';
import { ListenPageComponent } from './view/pages/listen-page/listen-page.component';
import { ListenComfirmPageComponent } from './view/pages/listen-comfirm-page/listen-comfirm-page.component';
import { ThankPageComponent } from './view/pages/thank-page/thank-page.component';
import { SpeakComfirmPageComponent } from './view/pages/speak-comfirm-page/speak-comfirm-page.component';
import { BackButtonComponent } from './view/components/back-button/back-button.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SpeakPageComponent,
    ListenPageComponent,
    ListenComfirmPageComponent,
    ThankPageComponent,
    SpeakComfirmPageComponent,
    BackButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
