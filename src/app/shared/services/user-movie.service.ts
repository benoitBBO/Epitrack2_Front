import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserMovieService {

  EPITRACK_API = 'http://localhost:8080/api/v1';
  
  constructor(private http: HttpClient, private router:Router) { }

  postUserMovie(idMovie:Number):any {
    if (sessionStorage.getItem('token')) {
      let endpoint = '/usermovie';
      let data = {
        "movie":{
          "id":idMovie
        },
        "status":"UNWATCHED",
        "userRating":0,
        "statusDate":"2022-02-02",
        "user":{
            "id":sessionStorage.getItem('id')
        }
      }
      console.log('avant post /usermovie', data);
      return this.http.post( this.EPITRACK_API + endpoint, data);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
