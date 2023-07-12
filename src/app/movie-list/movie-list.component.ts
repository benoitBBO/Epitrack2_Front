import { Component } from '@angular/core';
import { MovieModel } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movies: MovieModel[] = [];
  movie!: MovieModel;

  constructor(private service: MovieService) {
    console.log("constructor MovieService : ", this);
  }

  ngOnInit() {
    //requete get API
    console.log("ng init movie list");
    this.service.getBest4MoviesFromApi();
    //abonné aux changements du service movies$
    this.service.movies$.subscribe( data => this.movies = data);
  }
}
