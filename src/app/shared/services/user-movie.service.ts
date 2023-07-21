import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UsermovieModel } from '../models/usermovie.model';

@Injectable({
  providedIn: 'root'
})
export class UserMovieService {

  EPITRACK_API = 'http://localhost:8080/api/v1';
  
  private _usermovies$ = new BehaviorSubject<UsermovieModel[]>([]);
  private _usermovie$ = new BehaviorSubject<any>(UsermovieModel);

  constructor(private http: HttpClient,
              private router:Router) { }

  postUserMovie(idMovie:Number):any {
    let endpoint = '/usermovie';
    let data = {
      "movie":{
        "id":idMovie
      },
      "status":"UNWATCHED",
      "userRatings":0,
      "statusDate":new Date().toLocaleDateString(),
      "user":{
          "id": sessionStorage.getItem('id')
      }
    }
    console.log('avant post /usermovie', data);
    return this.http.post( this.EPITRACK_API + endpoint, data, {responseType:'text'});
  }

  getUserMoviesFromApi():void {
    let endpoint = '/usermovie/user/';
    this.http.get( this.EPITRACK_API + endpoint + sessionStorage.getItem('id'))
      .pipe( map( (response:any) => 
            response.map((movie:any) => new UsermovieModel(movie)) ) )
      .subscribe(data => this._usermovies$.next(data))
  }

  getBest4UserMoviesFromApi():void {
    let endpoint = '/usermovie/best4/';
    this.http.get( this.EPITRACK_API + endpoint + sessionStorage.getItem('id'))
      .pipe( map( (response:any) => 
            response.map((movie:any) => new UsermovieModel(movie)) ) )
      .subscribe(
        data => {this._usermovies$.next(data)
        console.log("data : ", data)
        console.log("this._usermovies$ : ", this._usermovies$)
        }
      )
  }
  changeStatusUserMovie(userMovieId:number, status:string) {
    let endpoint = '/usermovie/status/';
    let data = {}
    this.http.put( this.EPITRACK_API + endpoint + userMovieId + "/" + status, data, {responseType:'text'})
      .subscribe();
  }

  get usermovies$():Observable<UsermovieModel[]> {
    return this._usermovies$.asObservable();
  }
  setUserMovies$(data: UsermovieModel[]) {
    this._usermovies$.next(data);
  }
  get usermovie$():Observable<UsermovieModel> {
    return this._usermovie$.asObservable();
  }
  setUserMovie$(data: UsermovieModel) {
    this._usermovie$.next(data);
  }
}
