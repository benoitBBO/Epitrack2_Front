import { HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  EPITRACK_API = 'http://localhost:8080/api/v1';

  constructor(private http:HttpClient,
              private msgService:MessageService,
              private router:Router) { }

  login(data:{username:String, password:String}){
    //appel serveur (seveur vérifie les données de login et renvoie
    //               un token de connexion si ok)
    let endpoint = '/login';
    console.log("service login")
    return this.http.post(this.EPITRACK_API+endpoint, data)
       .pipe(
        tap( {
          error: (err:unknown) => {
            if (err instanceof HttpErrorResponse){
              console.log(err)
              switch(err.status) {
                case 401:
                  this.msgService.show("Accès refusé, utilisateur non authentifié", "error");
                  break;
                default:
                  this.msgService.show("Erreur Serveur", "error");
              }          
            }
          }
        })
       )
      
  }

  register(user:UserModel){
    console.log("méthode register");
    console.log("user"+user.userName+" "+user.password+" "+user.email+" "+user.firstName+" "+user.lastName);
    let endpoint = '/users/register';
    return this.http.post(this.EPITRACK_API+endpoint, user, {responseType:'text'})
      .pipe(
        tap( {
          error: (err:unknown) => {
            if (err instanceof HttpErrorResponse){
              switch(err.status) {
                case 404:
                  this.msgService.show("Bad Request", "error");
                  break;
                case 409:
                  this.msgService.show("Un compte existe déjà pour ce nom d'utilisateur", "error");
                  this.router.navigate(['/register'])
                  break;
                default:
                  this.msgService.show("Erreur Serveur", "error");
              }          
            }
          }          
        })
      )

  }

  findUser(username:String){
    console.log("méthode findUser");
    let endpoint = '/users/username/';
    return this.http.get(this.EPITRACK_API+endpoint + username)
      .pipe(
        tap( {
          error: (err:unknown) => {
            if (err instanceof HttpErrorResponse){
              switch(err.status) {
                case 404:
                  this.msgService.show("Bad Request", "error");
                  break;
                default:
                  this.msgService.show("Erreur Serveur", "error");
              }          
            }
          }          
        })
      )

  }

}
