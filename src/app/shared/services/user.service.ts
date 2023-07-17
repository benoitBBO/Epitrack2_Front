import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MessageService } from './message.service';


interface User {
  userName:string;
  firstName:string;
  lastName:string;
  email:string;
  password:string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  EPITRACK_API = 'http://localhost:8080/api/v1';

  constructor(private http:HttpClient,
              private msgService:MessageService) { }

  login(data:{username:String, password:String}){
   
    //appel serveur (seveur vérifie les données de login et renvoie
    //               un token de connexion si ok)
    let endpoint = '/login';
    console.log("service login")
    return this.http.post(this.EPITRACK_API+endpoint, data)
      //  .pipe(
      //   tap( {
      //     error: (err:unknown) => {
      //       if (err instanceof HttpErrorResponse){
      //         console.log(err)
      //         if (err.status==401){
      //           console.log("Accès refusé, utilisateur non authentifié")
      //           //mettre un msg à l'écran
      //           this.msgService.show("Accès refusé, utilisateur non authentifié", "error")
      //         }
      //         if (err.status==403){
      //           console.log("Accès refusé, utilisateur non autorisé")
      //           //mettre un msg à l'écran
      //         }
      //         if (err.status==404){
      //           console.log("utilisateur non connu")
      //           //mettre un msg à l'écran
      //         }
      //       }
      //     }
      //   })
      //  )
      
  }

  register(user:User){
    console.log("méthode register");
    console.log("user"+user.userName+" "+user.password+" "+user.email+" "+user.firstName+" "+user.lastName);
    let endpoint = '/users';
    return this.http.post(this.EPITRACK_API+endpoint, user, {responseType:"text"})

  }



}
