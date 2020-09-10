import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import{ Auth1Guard} from './auth1.guard';
import { from } from 'rxjs';


const appRoutes: Routes = [
  { path: '', redirectTo: '/login',canActivate:[Auth1Guard] ,pathMatch: 'full' },
  { path: 'chat', component: ChatComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
