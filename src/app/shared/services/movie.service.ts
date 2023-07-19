import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { MovieModel } from '../models/movie.model';
import { SerieModel } from '../models/serie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  EPITRACK_API = 'http://localhost:8080/api/v1';
  
  private _movies$ = new BehaviorSubject<MovieModel[]>([]);
  private _movie$ = new BehaviorSubject<any>(MovieModel);


  constructor(private http: HttpClient) {
    console.log("construteur Movie => ", this)
  }

  getMoviesFromApi():void {
    let endpoint = '/movies';
    this.http.get( this.EPITRACK_API + endpoint)
      .pipe( map( (response:any) => 
            response.map((movie:any) => new MovieModel(movie)) ) )
      .subscribe(data => this._movies$.next(data))
  }

  getBest4MoviesFromApi():void {
    let endpoint = '/movies/best4';
    this.http.get( this.EPITRACK_API + endpoint)
      .pipe( map( (response:any) => 
            response.map((movie:any) => new MovieModel(movie)) ) )
      .subscribe(data => this._movies$.next(data))
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

  getMovieById(id: number):void {
    let endpoint = '/movies/' + id;
      this.http.get(this.EPITRACK_API + endpoint)
          .pipe( map( (response:any) => 
            new MovieModel(response)) )
      .subscribe(data => this._movie$.next(data));
      
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
