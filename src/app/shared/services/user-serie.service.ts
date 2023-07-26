import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { UserserieModel } from '../models/userserie.model';
import { SerieModel } from '../models/serie.model';

@Injectable({
  providedIn: 'root'
})
export class UserSerieService {

  EPITRACK_API = 'http://localhost:8080/api/v1';
  
  public _userseries$ = new BehaviorSubject<UserserieModel[]>([]);
  
  constructor(private http:HttpClient) { }

  postUserSerie(serie:SerieModel, idUser:Number){
    let endpoint = '/userserie';
    let data = {
      "serie": {
        "id": serie.id
      },
      "userSeasons": new Array(),
      "status":"UNWATCHED",
      "statusDate":new Date(),
      "userRating":0,
      "user":{
        "id":idUser
      }
    }
    for (let season of serie.seasons) {
      let userSeason = {
        "season": {
          "id":season.id
        },
        "userEpisodes": new Array(),
        "status":"UNWATCHED",
        "statusDate":new Date(),
        "user":{
          "id":idUser
        }
      }
      for (let episode of season.episodes) {
        let userEpisode = {
          "episode": {
            "id": episode.id
          },
          "status":"UNWATCHED",
          "statusDate":new Date(),
          "user":{
            "id":idUser
          }
        }
        userSeason.userEpisodes.push(userEpisode);
      }
      data.userSeasons.push(userSeason);
    }
    console.log('avant post /userserie', data);
    return this.http.post( this.EPITRACK_API + endpoint, data, {responseType:'text'});
  }

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

  getUserSerieById(id: number):Observable<UserserieModel> {
    let endpoint = '/userserie/' + id;
      return this.http.get(this.EPITRACK_API + endpoint)
          .pipe( map( (response:any) => 
            new UserserieModel(response)) );   
  }

  updateUserRating(userRating:object):any{
    let endpoint = '/userserie/rating';
    let data = userRating;
    return this.http.put( this.EPITRACK_API + endpoint + "/", data, {responseType:'text'});
  }

  changeStatusUserSerie(userSerieId:number, status:string) {
    let endpoint = '/userserie/status/';
    let data = {};
    return this.http.put( this.EPITRACK_API + endpoint + userSerieId + "/" + status, data, {responseType:'text'})
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
