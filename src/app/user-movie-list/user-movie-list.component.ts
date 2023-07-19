import { Component } from '@angular/core';
import { UserMovieService } from '../shared/services/user-movie.service';
import { Router } from '@angular/router';
import { UsermovieModel } from '../shared/models/usermovie.model';

@Component({
  selector: 'app-user-movie-list',
  templateUrl: './user-movie-list.component.html',
  styleUrls: ['./user-movie-list.component.css']
})
export class UserMovieListComponent {
  movies: UsermovieModel[] = [];
  movie!: UsermovieModel;

  constructor(private router:Router,
              private userMovie:UserMovieService) {
    console.log("constructor MovieService : ", this);
  }

  ngOnInit() {
    //requete get API
    if (this.router.url == '/user') {
      this.userMovie.getBest4UserMoviesFromApi();
    } else if (this.router.url == '/user/movies') {
      this.userMovie.getUserMoviesFromApi();
    }
    this.userMovie.usermovies$.subscribe( data => this.movies = data);
  }
}
