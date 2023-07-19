import { Component } from '@angular/core';
import { MovieModel } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';
import { Router } from '@angular/router';
import { UserMovieService } from '../shared/services/user-movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movies: MovieModel[] = [];
  movie!: MovieModel;

  constructor(private service: MovieService,
              private router:Router,
              private userMovie:UserMovieService) {
    console.log("constructor MovieService : ", this);
  }

  ngOnInit() {
    //requete get API
    if (this.router.url == '/') {
      this.service.getBest4MoviesFromApi();
    } else if (this.router.url == '/movies') {
      this.service.getMoviesFromApi();
    }
    this.service.movies$.subscribe( data => this.movies = data);
  }
  onClickAddMovie(idMovie:Number) {
    console.log('onClickAddMovie===');
    if (sessionStorage.getItem('token')) {
        this.userMovie.postUserMovie(idMovie)
          .subscribe( {
            next: (response:any) => {
              console.log("retour post userMovie",response);
            }
          });
    } else {
        this.router.navigate(['/login']);
    }
  }
}
