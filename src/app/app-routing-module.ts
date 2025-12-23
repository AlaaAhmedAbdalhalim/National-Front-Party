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
import { AllMembers } from './Components/all-members/all-members';
import { AllNews } from './Components/all-news/all-news';
import { AllEvents } from './Components/all-events/all-events';
import { Login } from './Components/login/login';
import { AdminGuard } from './Guards/admin.guard';
import { EditMember } from './Components/edit-member/edit-member';
import { EditEvents } from './Components/edit-events/edit-events';

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
      { path: 'Admin', component: Admin, title: 'Admin  ' ,canActivate: [AdminGuard] },
      { path: 'AllMembers', component: AllMembers, title: 'كافة الاعضاء   ' },
      { path: 'AllNews', component: AllNews, title: 'كافة الاخبار   ' },
      { path: 'AllEvents', component: AllEvents, title: 'كافة الفاعليات   ' },
      { path: 'Login', component: Login, title: ' تسجيل الدخول ' },
      { path: 'EditMember/:id', component: EditMember, title: 'تعديل عضو' },
      { path: 'EditEvent/:id', component: EditEvents, title: 'تعديل فعالية' }
      /*       { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] }
       */
    ]
  },
  { path: '**', redirectTo: 'Home' },


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
