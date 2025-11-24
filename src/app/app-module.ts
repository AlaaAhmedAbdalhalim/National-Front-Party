import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './Components/header/header';
import { Footer } from './Components/footer/footer';
import { About } from './Components/About/about';
import { Members } from './Components/members/members';
import { News } from './Components/news/news';
import { Events } from './Components/events/events';
import { MainLayout } from './Components/main-layout/main-layout';
import { Home } from './Components/home/home';
import { JoinUs } from './Components/join-us/join-us';

@NgModule({
  declarations: [
    App,
    Header,
    Footer,
    About,
    Members,
    News,
    Events,
    MainLayout,
    Home,
    JoinUs
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
