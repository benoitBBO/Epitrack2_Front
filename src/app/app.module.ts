import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { VideoAccueilComponent } from './video-accueil/video-accueil.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { StarsComponent } from './shared/components/stars/stars.component';
import { PrintImgPipe } from './shared/pipes/print-img.pipe';
import { SerieListComponent } from './serie-list/serie-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchbarComponent,
    VideoAccueilComponent,
    MovieListComponent,
    StarsComponent,
    PrintImgPipe,
    SerieListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
