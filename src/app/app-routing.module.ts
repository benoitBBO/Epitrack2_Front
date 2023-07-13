import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoAccueilComponent } from './video-accueil/video-accueil.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {path:'', component:VideoAccueilComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
