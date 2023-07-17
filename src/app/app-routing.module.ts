import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoAccueilComponent } from './video-accueil/video-accueil.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MovieAccueilComponent } from './movie-accueil/movie-accueil.component';
import { SerieAccueilComponent } from './serie-accueil/serie-accueil.component';
import { UserAccueilComponent } from './user-accueil/user-accueil.component';
import { VideoDetailsComponent } from './video-details/video-details/video-details.component';

const routes: Routes = [
  {path:'', component:VideoAccueilComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'movies', component:MovieAccueilComponent},
  {path:'series', component:SerieAccueilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
