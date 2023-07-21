import { Component } from '@angular/core';
import { TmdbmovieModel } from '../shared/models/tmdbmovie.model';
import { MovieService } from '../shared/services/movie.service';
import { SerieService } from '../shared/services/serie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbserieModel } from '../shared/models/tmdbserie.model';

@Component({
  selector: 'app-search-tmdb',
  templateUrl: './search-tmdb.component.html',
  styleUrls: ['./search-tmdb.component.css']
})
export class SearchTMDBComponent {
  movies: TmdbmovieModel[] = [];
  series: TmdbserieModel[] = [];
  search_input!:string;
  
  constructor(private movieService: MovieService,
              private serieService: SerieService,
              private route: ActivatedRoute,
              private router: Router){};

  ngOnInit() {
    //TODO routeReuseStrategy deprecated
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.movieService.searchMoviesFromTMDBApi(this.route.snapshot.params['search_input'])
      .subscribe( (data:TmdbmovieModel[]) => this.movies = data);
    this.serieService.searchSeriesFromTMDBApi(this.route.snapshot.params['search_input'])
      .subscribe( (data:TmdbserieModel[]) => this.series = data);
  }
  onClickAddSerie(serieId:number) {
    this.serieService.getSerieTmdbById(serieId)
      .subscribe( (data:any) => this.serieService.postNewSerie(data) )
  }
}
