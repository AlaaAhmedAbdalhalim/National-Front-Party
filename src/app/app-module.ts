import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './Components/header/header';
import { Footer } from './Components/footer/footer';
import { About } from './Components/home/about';
import { Members } from './Components/members/members';

@NgModule({
  declarations: [
    App,
    Header,
    Footer,
    About,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    Members
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
