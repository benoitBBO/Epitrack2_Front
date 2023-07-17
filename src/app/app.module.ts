import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { RegisterComponent } from './auth/register/register.component';
import { MovieAccueilComponent } from './movie-accueil/movie-accueil.component';
import { SerieAccueilComponent } from './serie-accueil/serie-accueil.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { UserAccueilComponent } from './user-accueil/user-accueil.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchbarComponent,
    VideoAccueilComponent,
    MovieListComponent,
    StarsComponent,
    PrintImgPipe,
    SerieListComponent,
    LoginComponent,
    RegisterComponent,
    MovieAccueilComponent,
    SerieAccueilComponent,
    UserAccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],

  providers: [
    // {provide : HTTP_INTERCEPTORS, useClass : ErrorInterceptor, multi:true},
  {
    provide : HTTP_INTERCEPTORS, 
    useClass : TokenInterceptor,
    multi:true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
