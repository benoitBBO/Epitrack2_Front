import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { MovieModel } from '../models/movie.model';
import { TmdbmovieModel } from '../models/tmdbmovie.model';
import { TmdbmovieDetailDtoModel } from '../models/tmdbmovie-detail-dto.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  EPITRACK_API = 'http://localhost:8080/api/v1';//TODO a mettre en constante
  TMDB_API = 'https://api.themoviedb.org/3';
  APIKEY_TMDB = '503f9b6e89ed3a77b5a426dbc8e1094f';

  private _movies$ = new BehaviorSubject<MovieModel[]>([]);
  private _movie$ = new BehaviorSubject<any>(MovieModel);


  constructor(private http: HttpClient) {
    console.log("construteur Movie => ", this)
  }

  getMoviesFromApi():Observable<MovieModel[]> {
    let endpoint = '/movies';
    return this.http.get( this.EPITRACK_API + endpoint)
      .pipe( map( (response:any) => 
            response.map((movie:any) => new MovieModel(movie)) ) );
  }

  getBest4MoviesFromApi():Observable<MovieModel[]> {
    let endpoint = '/movies/best4';
    return this.http.get( this.EPITRACK_API + endpoint)
      .pipe( map( (response:any) => 
            response.map((movie:any) => new MovieModel(movie)) ) );
  }

  searchMoviesFromApi(saisieRch:string):Observable<MovieModel[]> {
    let endpoint = '/movies/search';
    let options = new HttpParams()
      .set('query', saisieRch)
    return this.http.get( this.EPITRACK_API + endpoint, {params:options})
    // on map la reponse pour que le compoment ait un MovieModel[]
      .pipe( map( (response:any) => 
            response.map((movie:any) => new MovieModel(movie)) ) )
  }

  // getMovieById(id: number):void {
  //   let endpoint = '/movies/' + id;
  //     this.http.get(this.EPITRACK_API + endpoint)
  //         .pipe( map( (response:any) => 
  //           new MovieModel(response)) )
  //     .subscribe(data => this._movie$.next(data));
      
  // }
  getMovieById(id: number):Observable<MovieModel> {
    let endpoint = '/movies/' + id;
      return this.http.get(this.EPITRACK_API + endpoint)
          .pipe( map( (response:any) => 
            new MovieModel(response)) );
  }

  searchMoviesFromTMDBApi(saisieRch:string):Observable<TmdbmovieModel[]> {
    let endpoint = '/search/movie';
    let options = new HttpParams()
      .set('api_key', this.APIKEY_TMDB)
      .set('query', saisieRch)
      .set('language', 'fr')
    return this.http.get( this.TMDB_API + endpoint, {params:options})
      .pipe( map( (response:any) => 
            response.results.map((movie:any) => new TmdbmovieModel(movie)) ) )
  }

  getMovieTmdbById(movieId:number) {
    let endpoint = '/movie/';
    let options = new HttpParams()
      .set('api_key', this.APIKEY_TMDB)
      .set('append_to_response','credits')
      .set('language', 'fr')
    return this.http.get( this.TMDB_API + endpoint + movieId, {params:options})
      .pipe( map( (response:any) => new TmdbmovieDetailDtoModel(response) ) )
  }

  postNewMovie(movie:TmdbmovieDetailDtoModel) {
    return this.http.post(this.EPITRACK_API + '/movies', movie)
      .pipe(map((response) => new Number(response)));
  }

  get movies$():Observable<MovieModel[]> {
    return this._movies$.asObservable();
  }
  setMovies$(data: MovieModel[]) {
    this._movies$.next(data);
  }
  get movie$():Observable<MovieModel> {
    return this._movie$.asObservable();
  }
  setMovie$(data: MovieModel) {
    this._movie$.next(data);
  }
}
