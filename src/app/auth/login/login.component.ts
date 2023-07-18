import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  connectedUser!:UserModel;
  
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

  onLoginSubmit(ev:Event){
    this.isSubmitted = true;
    if(this.loginForm.valid){
      this.userService.login(this.loginForm.value)
        .subscribe( {
          next: (response:any) => {
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('username', response.username);
            this.userService.findUser(response.username)
              .subscribe( {
                next: (response:any) => {
                  this.connectedUser = response;
                  console.log("reponse findUser", response);
                  this.msgService.show("Vous êtes connecté", "success");
                  this.router.navigate(['/user']);
                  this.isSubmitted = false;
                }
              }
            )
          }
        }    
      )
    }
  }
 

}
