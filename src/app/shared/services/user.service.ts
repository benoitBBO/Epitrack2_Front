import { HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { MessageService } from './message.service';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  EPITRACK_API = 'http://localhost:8080/api/v1';

  public _loggedUser$ = new BehaviorSubject<any>(UserModel);

  constructor(private http:HttpClient,
              private msgService:MessageService,
              private router:Router) { }

  
  get loggedUser$():Observable<UserModel> {
      return this._loggedUser$.asObservable();
  }
  get loggedUser():UserModel {
      return this._loggedUser$.getValue();
  }

  //VERSION INITIALE, AVANT BehaviorSubject
  // login(data:{username:String, password:String}){
  //   //appel serveur (seveur vérifie les données de login et renvoie
  //   //               un token de connexion si ok)
  //   let endpoint = '/login';
  //   console.log("service login")
  //   return this.http.post(this.EPITRACK_API+endpoint, data)
  //      .pipe(
  //       tap( {
  //         error: (err:unknown) => {
  //           if (err instanceof HttpErrorResponse){
  //             switch(err.status) {
  //               case 401:
  //                 this.msgService.show("utilisateur non authentifié", "error");
  //                 break;
  //               default:
  //                 this.msgService.show("erreur serveur", "error");
  //             }          
  //           }
  //         }
  //       })
  //      )  
  // }

  //VERSION AVEC BehaviorSubject
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
              switch(err.status) {
                case 401:
                  this.msgService.show("utilisateur non authentifié", "error");
                  break;
                default:
                  this.msgService.show("erreur serveur", "error");
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
    return this.http.post(this.EPITRACK_API+endpoint, user, {responseType:'text'});
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

  saveLoggedUser(user:any){
    console.log("méthode saveLoggedUser");
    
    sessionStorage.setItem('id',user.id);
    sessionStorage.setItem('username',user.userName);
    sessionStorage.setItem('lastname',user.lastName);
    sessionStorage.setItem('firstname',user.firstName);
    sessionStorage.setItem('email',user.email);

    //TODO en double sessionStorage + loggedUser
    this._loggedUser$.next(user);
    return new Promise( (resolve, reject) => {
      if (this.loggedUser == null) {
        reject("Ko");
      }else {
        resolve("Ok");
      }
    })
  }

  clearLoggedUser(){
    console.log("méthode clearLoggedUser");
    
    this.loggedUser.id = 0;
    this.loggedUser.userName = "";
    this.loggedUser.firstName = "";
    this.loggedUser.lastName = "";
    this.loggedUser.email = "";
  }

}
