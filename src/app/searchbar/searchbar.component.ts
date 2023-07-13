import { Component } from '@angular/core';
import { MovieModel } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';
import { SerieService } from '../shared/services/serie.service';
import { SerieModel } from '../shared/models/serie.model';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  
  searchMovies: MovieModel[] = [];
  searchSeries: SerieModel[] = [];
  searchVideos: MovieModel[] = [];

  constructor(private movieService: MovieService, private serieService: SerieService) {
    console.log("constructor MovieService et Serie dans search");
  }

  onKeyUp(saisie: string){
    this.searchVideos = [];
    if (saisie.length > 2) {
      this.movieService.searchMoviesFromApi(saisie)
        .subscribe((movies:MovieModel[]) => this.searchVideos.push(...movies));
      this.serieService.searchSeriesFromApi(saisie)
        .subscribe((series:SerieModel[]) => this.searchVideos.push(...series));
    } else {
      this.searchVideos = [];
    }
  }
}
