import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!:FormGroup;
  isSubmitted:boolean = false;
  
  constructor(private fb:FormBuilder,
            private userService:UserService,
            private msgService:MessageService,
            private router:Router
              ){}

  ngOnInit(){
    console.log("coucou Register.ts NgOnInit");
    this.registerForm = this.fb.group({
      userName:['', [Validators.required]],
      password:['', [Validators.required, Validators.minLength(8)]],
      email:['', [Validators.required, Validators.email]],
      firstName:[''],
      lastName:['']     
    });
  }


  onRegisterSubmit(ev:Event){
    this.isSubmitted = true;
    console.log("avant inscription "+this.registerForm.valid);
    if(this.registerForm.valid){
      this.userService.register(this.registerForm.value)
      .subscribe( {
        next: (response:any) => {
          console.log("inscription ok"+response);
          this.msgService.show("Compte créé avec succès", "success");
          this.router.navigate(['/login']);
        },
        error: (err:unknown) => {
          if (err instanceof HttpErrorResponse){
            switch(err.status) {
              case 404:
                this.msgService.show("Bad Request", "error");
                break;
              case 409:
                this.msgService.show("Un compte existe déjà pour "+this.registerForm.get('userName')?.value, "error");
                this.registerForm.patchValue({userName:""});
                break;
              default:
                this.msgService.show("Erreur Serveur", "error");
            }          
          }
        }
        
      })
    }
  }
 
}
