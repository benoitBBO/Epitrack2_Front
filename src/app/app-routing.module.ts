import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoAccueilComponent } from './video-accueil/video-accueil.component';

const routes: Routes = [
  {path:'', component:VideoAccueilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
