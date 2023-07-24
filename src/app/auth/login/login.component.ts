import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserModel } from 'src/app/shared/models/user.model';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!:FormGroup;
  isSubmitted:boolean = false;
  
  
  constructor(private fb:FormBuilder,
            private userService:UserService,
            private router:Router,
            private msgService:MessageService
               ){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      username:['', [Validators.required]],
      password:['', [Validators.required]]
    });
  }

  
  //VERSION INITIALE, AVANT BehaviorSubject dans USER-SERVICE
  // onLoginSubmit(ev:Event){
  //   this.isSubmitted = true;
  //   if(this.loginForm.valid){
  //     this.userService.login(this.loginForm.value)
  //       .subscribe( {
  //         next: (response:any) => {
  //           sessionStorage.setItem('token', response.token);
  //           sessionStorage.setItem('username', response.username);
  //           this.userService.findUser(response.username)
  //             .subscribe( {
  //               next: (response:any) => {
  //                 sessionStorage.setItem('id',response.id);
  //                 sessionStorage.setItem('lastname',response.lastName);
  //                 sessionStorage.setItem('firstname',response.firstName);
  //                 sessionStorage.setItem('email',response.email);
  //                 console.log("reponse findUser", response);
  //                 this.msgService.show("Vous êtes connecté", "success");
  //                 this.router.navigate(['/user']);
  //                 this.isSubmitted = false;
  //               }
  //             }
  //           )
  //         }
  //       }    
  //     )
  //   }
  // }
 

  onLoginSubmit(ev:Event){
    this.isSubmitted = true;
    if(this.loginForm.valid){
      this.userService.login(this.loginForm.value)
          .subscribe( {
            next: (response:any) => {
              sessionStorage.setItem('token', response.token);
              this.userService.findUser(response.username)
               .subscribe( {
                  next: (response:any) => {
                    console.log("reponse findUser", response);
                    this.userService.saveLoggedUser(response)
                    .then( (resolve) => {
                      this.msgService.show("Vous êtes connecté", "success");
                      this.router.navigate(['/user']);
                      this.isSubmitted = false;
                    })
                    .catch( (reject) => { console.log("saveLoggedUser KO")})                 
                  }
                } )
            }
          } )
      }
    }

}
