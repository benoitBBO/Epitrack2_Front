import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { MovieModel } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  EPITRACK_API = 'http://localhost:8080/api/v1';
  
  private _movies$ = new BehaviorSubject<MovieModel[]>([]);

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


  get movies$():Observable<MovieModel[]> {
    return this._movies$.asObservable();
  }
  setMovies$(data: MovieModel[]) {
    this._movies$.next(data);
  }
  

}
