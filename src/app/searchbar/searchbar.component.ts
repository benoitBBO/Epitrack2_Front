import { Component } from '@angular/core';
import { MovieModel } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';
import { SerieService } from '../shared/services/serie.service';
import { SerieModel } from '../shared/models/serie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  
  searchMovies: MovieModel[] = [];
  searchSeries: SerieModel[] = [];
  searchVideos: MovieModel[] = [];
  isListVisible:boolean = false;

  constructor(private movieService: MovieService,
              private serieService: SerieService,
              private router:Router) {
    console.log("constructor MovieService et Serie dans search");
  }

  onKeyUp(saisie: string){
    this.searchVideos = [];
    if (saisie.length > 2) {
      this.isListVisible = true;
      this.movieService.searchMoviesFromApi(saisie)
        .subscribe((movies:MovieModel[]) => this.searchVideos.push(...movies));
      this.serieService.searchSeriesFromApi(saisie)
        .subscribe((series:SerieModel[]) => this.searchVideos.push(...series));
    }
  }
  
}
