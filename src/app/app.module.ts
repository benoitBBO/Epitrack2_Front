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
import { VideoDetailsComponent } from './video-details/video-details/video-details.component';
import { UserAccueilComponent } from './user-accueil/user-accueil.component';
import { UserMovieListComponent } from './user-movie-list/user-movie-list.component';
import { UserSerieListComponent } from './user-serie-list/user-serie-list.component';
import { UserMovieAccueilComponent } from './user-movie-accueil/user-movie-accueil.component';
import { ToggleComponent } from './shared/components/toggle/toggle.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserSerieAccueilComponent } from './user-serie-accueil/user-serie-accueil.component';
import { MatMenuModule } from '@angular/material/menu';
import { SearchTMDBComponent } from './search-tmdb/search-tmdb.component';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LogoutComponent } from './auth/logout/logout.component';
import { IsInCatalogPipe } from './shared/pipes/is-in-catalog.pipe';
import { StatusDisplayPipe } from './shared/pipes/status-display.pipe';
import { ProfilComponent } from './auth/profil/profil.component';

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
    VideoDetailsComponent,
    UserMovieListComponent,
    UserSerieListComponent,
    UserAccueilComponent,
    UserMovieAccueilComponent,
    UserSerieAccueilComponent,
    SearchTMDBComponent,
    ConfirmationDialogComponent,
    LogoutComponent,
    IsInCatalogPipe,
    StatusDisplayPipe,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    ToggleComponent,
    MatMenuModule,
    MatDialogModule
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
