import { Component } from '@angular/core';
import { MovieModel } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';
import { Router } from '@angular/router';
import { UserMovieService } from '../shared/services/user-movie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../shared/services/message.service';
import { TmdbmovieModel } from '../shared/models/tmdbmovie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movies: MovieModel[] = [];
  movie!: MovieModel;
  tmdb_movies: TmdbmovieModel[] = [];

  constructor(private service: MovieService,
              private router:Router,
              private msgService:MessageService,
              private userMovie:UserMovieService) {
    console.log("constructor MovieService : ", this);
  }

  ngOnInit() {
    //requete get API
    if (this.router.url == '/') {
      this.service.getBest4MoviesFromApi().subscribe( data => this.movies = data);
    } else if (this.router.url == '/movies') {
      this.service.getMoviesFromApi().subscribe( data => this.movies = data);
    }
  }
  onClickAddMovie(idMovie:Number) {
    console.log('onClickAddMovie===');
    if (sessionStorage.getItem('token')) {
        this.userMovie.postUserMovie(idMovie)
          .subscribe( {
            next: (response:any) => {
              console.log("retour post userMovie",response);
              this.msgService.show("Film ajouté avec succès", "success");
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
    } else {
        this.router.navigate(['/login']);
    }
  }
}
