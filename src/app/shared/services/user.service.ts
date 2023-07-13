import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface User {
  username:string;
  firstname:string;
  lastname:string;
  email:string;
  password:string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  EPITRACK_API = 'http://localhost:8080/api/v1';

  constructor(private http:HttpClient) { }

  login(data:{username:String, password:String}){
    
    //appel serveur (seveur vérifie les données de login et renvoie
    //               un token de connexion si ok)
    let endpoint = '/login';
    console.log("service login")
    return this.http.post(this.EPITRACK_API+endpoint, data)
    //return this.http.post(this.EPITRACK_API+endpoint, data, {withCredentials: true})
    //.subscribe(resp => console.log("resp.headers= ",resp.headers))
      
  }

  register(user:User){
    console.log("méthode register")
  }


}
