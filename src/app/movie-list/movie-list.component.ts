import { Component } from '@angular/core';
import { MovieModel } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';
import { RouteReuseStrategy, Router, RouterState } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movies: MovieModel[] = [];
  movie!: MovieModel;

  constructor(private service: MovieService, private router:Router) {
    console.log("constructor MovieService : ", this);
  }

  ngOnInit() {
    //requete get API
    this.service.getBest4MoviesFromApi();
    this.service.movies$.subscribe( data => this.movies = data);
  }
}
