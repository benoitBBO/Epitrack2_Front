import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UserserieModel } from '../models/userserie.model';

@Injectable({
  providedIn: 'root'
})
export class UserSerieService {

  EPITRACK_API = 'http://localhost:8080/api/v1';
  
  private _userseries$ = new BehaviorSubject<UserserieModel[]>([]);

  constructor(private http:HttpClient) { }

  get userseries$():Observable<UserserieModel[]> {
    return this._userseries$.asObservable();
  }
  getUserSeriesFromApi():void {
    let endpoint = '/userserie/user/';
    this.http.get( this.EPITRACK_API + endpoint + sessionStorage.getItem('id'))
      .pipe( map( (response:any) => 
            response.map((serie:any) => new UserserieModel(serie)) ) )
      .subscribe(data => this._userseries$.next(data))
  }

  getBest4UserSeriesFromApi():void {
    let endpoint = '/userserie/best4/';
    this.http.get( this.EPITRACK_API + endpoint + sessionStorage.getItem('id'))
      .pipe( map( (response:any) => 
            response.map((serie:any) => new UserserieModel(serie)) ) )
      .subscribe(
        data => {this._userseries$.next(data)
        console.log("data : ", data)
        console.log("this._userseries$ : ", this._userseries$)
        }
      )
  }

}
