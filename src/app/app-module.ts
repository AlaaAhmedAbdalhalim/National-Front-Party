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
import { ContactUS } from './Components/contact-us/contact-us';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Admin } from './Components/admin/admin';
import { FormsModule } from '@angular/forms';
import { AllMembers } from './Components/all-members/all-members';
import { AllNews } from './Components/all-news/all-news';
import { AllEvents } from './Components/all-events/all-events';
import { AuthInterceptor } from './auth.interceptor';
import { Login } from './Components/login/login';

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
    JoinUs,
    ContactUS,
    AllMembers,
    AllNews,
    AllEvents,
    Login
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    HttpClientModule
  ],
providers: [
  provideBrowserGlobalErrorListeners(),
  provideClientHydration(withEventReplay()),

  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
],
  bootstrap: [App]
})
export class AppModule { }
