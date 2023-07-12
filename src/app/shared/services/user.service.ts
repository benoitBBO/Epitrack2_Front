import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  EPITRACK_API = 'http://localhost:8080/api/v1';

  constructor(private http:HttpClient) { }

  login(data:{email:String, password:String}){
    
    //appel serveur pour vérifier les données de login
    let endpoint = '/login';
    let option = 
    this.http.post(this.EPITRACK_API+endpoint, data, {observe: 'response'})
    .subscribe(resp => console.log("resp.headers= ",resp.headers.get('Authorization')))
      


    //et récupérer un token de connexion
    


  }
}
