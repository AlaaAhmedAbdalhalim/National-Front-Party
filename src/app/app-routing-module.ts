import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from './Components/main-layout/main-layout';
import { About } from './Components/About/about';
import { Home } from './Components/home/home';
import { Members } from './Components/members/members';
import { News } from './Components/news/news';
import { Events } from './Components/events/events';
import { JoinUs } from './Components/join-us/join-us';
import { ContactUS } from './Components/contact-us/contact-us';
import { Admin } from './Components/admin/admin';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  {
    path: '', component: MainLayout, children: [
      { path: 'Home', component: Home, title: 'الصفحة الرئيسية' },
      { path: 'About', component: About, title: 'من نحن ' },
      { path: 'Members', component: Members, title: 'الاعضاء' },
      { path: 'News', component: News, title: 'الاخبار' },
      { path: 'Events', component: Events, title: 'الفاعليات' },
      { path: 'JoinUs', component: JoinUs, title: 'أنضم الينا' },
      { path: 'ContactUs', component: ContactUS, title: 'تواصل معانا ' },
      { path: 'Admin', component: Admin, title: 'Admin  ' },
    ]
  },
  { path: '**', redirectTo: 'Home' } ,


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
