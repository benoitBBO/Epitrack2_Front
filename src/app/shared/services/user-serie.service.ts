import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { UserserieModel } from '../models/userserie.model';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserSerieService {

  EPITRACK_API = 'http://localhost:8080/api/v1';
  
  public _userseries$ = new BehaviorSubject<UserserieModel[]>([]);
  
  constructor(private http:HttpClient,
              private msgService:MessageService,
              private router:Router) { }

  

  
  
  getUserSeriesFromApi(userid:number):void {
    let endpoint = '/userserie/user/';
    this.http.get( this.EPITRACK_API + endpoint + userid)
      .pipe( map( (response:any) => 
            response.map((serie:any) => new UserserieModel(serie)) ) )
      .subscribe(data => this._userseries$.next(data))
  }

  getBest4UserSeriesFromApi(userid:number):void {
    console.log("getBest4UserSeriesFromApi  --- id= ",userid);
    let endpoint = '/userserie/best4/';
    this.http.get( this.EPITRACK_API + endpoint + userid)
      .pipe( map( (response:any) => 
            response.map((serie:any) => new UserserieModel(serie)) ) )
      .subscribe(
        data => {this._userseries$.next(data)
        console.log("data : ", data)
        console.log("this._userseries$ : ", this._userseries$)
        }
      )
  }


  changeStatusUserSerie(userSerieId:number, status:string) {
    let endpoint = '/userserie/status/';
    return this.http.put( this.EPITRACK_API + endpoint + userSerieId + "/" + status, {responseType:'text'})
    ;
  } 

  get userseries$():Observable<UserserieModel[]> {
    return this._userseries$.asObservable();
  }
  setUserSeries$(data: UserserieModel[]) {
    this._userseries$.next(data);
  }

  get userseries():UserserieModel[] {
    return this._userseries$.getValue();
  }
  

}
