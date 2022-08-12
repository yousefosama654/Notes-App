import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RoutingGuard } from './routing.guard';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
const routes: Routes = [
  {path:"home",canActivate:[RoutingGuard],component:HomeComponent},
  {path:"",canActivate:[RoutingGuard],component:HomeComponent},
  {path:"signin",component:SigninComponent},
  {path:"signup",component:SignupComponent},
{path:"**",component:NotfoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
