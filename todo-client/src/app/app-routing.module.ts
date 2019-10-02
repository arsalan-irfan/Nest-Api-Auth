import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodosComponent} from './todos/todos.component'
import {SigninComponent} from './auth/signin/signin.component'
import {SignupComponent} from './auth/signup/signup.component'


const routes: Routes = [
  {path:'todos',component:TodosComponent},
  {path:'',component:SigninComponent},
  {path:'signup',component:SignupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
