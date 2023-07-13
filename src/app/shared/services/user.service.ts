import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  EPITRACK_API = 'http://localhost:8080/api/v1';

  constructor(private http:HttpClient) { }

  login(data:{email:String, password:String}):Observable<any> {
    
    //appel serveur pour vérifier les données de login
    let endpoint = '/login';

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': '' });
    let options = { headers: headers };
    return this.http.post(this.EPITRACK_API+endpoint, data, options)
      .pipe(
        tap((response:any) => {
          console.log('Token:', response.headers.get('Authorization'));
        })
      
      )

    //et récupérer un token de connexion
    


  }
}
