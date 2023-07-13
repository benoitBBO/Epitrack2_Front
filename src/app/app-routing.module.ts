import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoAccueilComponent } from './video-accueil/video-accueil.component';
import { LoginComponent } from './auth/login/login.component';
import { MovieListComponent } from './movie-list/movie-list.component';

const routes: Routes = [
  {path:'', component:VideoAccueilComponent},
  {path:'login', component:LoginComponent},
  {path:'movies', component:MovieListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
