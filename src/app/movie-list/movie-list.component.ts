import { Component } from '@angular/core';
import { MovieModel } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';
import { Router } from '@angular/router';
import { UserMovieService } from '../shared/services/user-movie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../shared/services/message.service';
import { UsermovieModel } from '../shared/models/usermovie.model';
import { TmdbmovieModel } from '../shared/models/tmdbmovie.model';
import { UserModel } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movies: MovieModel[] = [];
  movie!: MovieModel;
  userMovies!: UsermovieModel[];
  loggedUser!:UserModel;
  dynamicCatalog: any[] = [];

  constructor(private service: MovieService,
              private router:Router,
              private msgService:MessageService,
              private userMovie:UserMovieService,
              private userService:UserService) {
    console.log("constructor MovieService : ", this);
  }

  ngOnInit() {
    //Récupération des userMovies
    this.userMovie._usermovies$.subscribe(data => this.userMovies = data);
    //requete get API
    if (this.router.url == '/') {
      this.service.getBest4MoviesFromApi().subscribe( data => {
        this.movies = data;
        this.loadingDynamicCatalogVariable();
      });
    } else if (this.router.url == '/movies') {
      // this.service.getMoviesFromApi().subscribe( data => this.movies = data);
      this.service.getMoviesFromApi().subscribe( data => {
        this.movies = data;
        this.loadingDynamicCatalogVariable();
      });
    }
  }

  onClickAddMovie(idMovie:Number, index:number) {
    console.log('onClickAddMovie===');
    if (sessionStorage.getItem('token')) {
        this.userService._loggedUser$.subscribe((user:any) => {
        this.loggedUser=user;
        this.userMovie.postUserMovie(idMovie, this.loggedUser.id)
          .subscribe( {
            next: (response:any) => {
              //Mise à jour de la selection User
              this.userMovie._usermovies$ = new BehaviorSubject<any>(response);
              
              this.msgService.show("Film ajouté avec succès", "success");
              this.dynamicCatalog[index] = !this.dynamicCatalog[index];
            },
            error: (err:unknown) => {
              if (err instanceof HttpErrorResponse){
                let errorObj = JSON.parse(err.error);
                switch(err.status) {
                  case 404:
                    this.msgService.show(errorObj.description, "error");
                    break;
                  case 409:
                    this.msgService.show("Ce film est déjà suivi", "error");
                    break;
                  default:
                    this.msgService.show("code Http: "+errorObj.description+ "description: "+errorObj.description, "error");
                }          
              }
            }
          });
        });
    } else {
        this.router.navigate(['/login']);
    }
  }

  onClickWithdrawMovie(idMovie:Number, index:number) {
    this.userService._loggedUser$.subscribe((user:any) => {
      this.loggedUser=user;
      this.userMovie.deleteUserMovie(idMovie, this.loggedUser.id)
        .subscribe( {
          next: (response:any) => {
            console.log("retour post userMovie",response);
            this.msgService.show("Film retiré du catalogue avec succès", "success");
            this.dynamicCatalog[index] = !this.dynamicCatalog[index];
          },
          error: (err:unknown) => {
            if (err instanceof HttpErrorResponse){
              let errorObj = JSON.parse(err.error);
              switch(err.status) {
                case 404:
                  this.msgService.show(errorObj.description, "error");
                  break;
                default:
                  this.msgService.show("code Http: "+errorObj.description+ "description: "+errorObj.description, "error");
              }          
            }
          }
        });
      });
  };

  loadingDynamicCatalogVariable(){
    if(sessionStorage.length > 0){
      for(let movie of this.movies){
        this.dynamicCatalog.push(this.isNotInCatalog(movie.id));
      }
    }
  }

  isNotInCatalog(idMovie:Number){
    if(sessionStorage.length > 0){
      for(let userMovie of this.userMovies){
        if(userMovie.movie.id === idMovie){
          return false;
        }
      }
      return true;
    }
    return true;
  }
}
