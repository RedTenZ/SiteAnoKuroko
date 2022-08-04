import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SendMsgComponent } from './send-msg/send-msg.component'
import { ViewMsgComponent } from './view-msg/view-msg.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sendmsg', component: SendMsgComponent },
  { path: 'viewmsg', component: ViewMsgComponent },
  { path: '', pathMatch: 'full', redirectTo: 'sendmsg' },
  { path: '*', redirectTo:'sendmsg'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
