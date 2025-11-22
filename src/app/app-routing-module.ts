import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from './Components/main-layout/main-layout';
import { About } from './Components/About/about';
import { Home } from './Components/home/home';
import { Members } from './Components/members/members';
import { News } from './Components/news/news';
import { Events } from './Components/events/events';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  {
    path: '', component: MainLayout, children: [
      { path: 'Home', component: Home, title: 'الصفحة الرئيسية' },
      { path: 'About', component: About, title: 'من نحن ' },
      { path: 'Members', component: Members, title: 'الاعضاء' },
      { path: 'News', component: News, title: 'الاخبار' },
      { path: 'Events', component: Events, title: 'الفاعليات' },
    ]
  },
  { path: '**', redirectTo: 'الصفحة الرئيسية ' } 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
