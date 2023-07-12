import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  login(data:{email:String, password:String}){
    
    //appel serveur pour vérifier les données de login
    //et récupérer un token de connexion
    


  }
}
