import { HttpErrorResponse } from '@angular/common/http';
import { ParseError } from '@angular/compiler';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/models/user.model';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!:FormGroup;
  passwordForm!:FormGroup;
  passwordControl!:FormControl;
  confirmPasswordControl!:FormControl;
  isSubmitted:boolean = false;
  inputUser:UserModel = new UserModel({});
  
  constructor(private fb:FormBuilder,
            private userService:UserService,
            private msgService:MessageService,
            private router:Router
              ){}

  ngOnInit(){
    this.initFormControls();
        
    this.registerForm = this.fb.group({
      userName:['', [Validators.required]],
      passwords: this.passwordForm,
      email:['', [Validators.required, Validators.email]],
      firstName:[''],
      lastName:['']     
    });
  }

  initFormControls(){
    this.passwordControl = this.fb.control('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]);
    this.confirmPasswordControl = this.fb.control('', [Validators.required]) ;
    this.passwordForm = this.fb.group({
      password: this.passwordControl,
      confirmPassword: this.confirmPasswordControl
    },
    { validators: [this.confirmEqualValidator('password', 'confirmPassword')]}
    )
  }

  confirmEqualValidator(main:string, confirm:string): ValidatorFn {
    return (ctl:AbstractControl) : null | ValidationErrors => {
      if (!ctl.get(main) || !ctl.get(confirm)) {
        return {confirmEqual:"erreur : les données ne peuvent pas être comparées"};
      }
      let mainValue = ctl.get(main)!.value;
      let confirmValue = ctl.get(confirm)!.value;
      console.log("mdp1et2 = ", mainValue, confirmValue);
      if (mainValue === confirmValue) {
        return null;    //validator OK
      } else {
        return {confirmEqual:"erreur : valeurs différentes"}; 
      };
    };
  }

  onRegisterSubmit(ev:Event){
    this.isSubmitted = true;
    
    this.inputUser.userName = this.registerForm.value.userName;
    this.inputUser.password = this.registerForm.value.passwords.password;
    this.inputUser.email = this.registerForm.value.email;
    this.inputUser.firstName = this.registerForm.value.firstName;
    this.inputUser.lastName = this.registerForm.value.lastName;
    
    if(this.registerForm.valid){
      this.userService.register(this.inputUser)
      .subscribe( {
        next: (response:any) => {
          console.log("inscription ok"+response);
          this.msgService.show("Compte créé avec succès", "success");
          this.router.navigate(['/login']);
        },
        error: (err:unknown) => {
          if (err instanceof HttpErrorResponse){
            let errorObj = JSON.parse(err.error);
            switch(err.status) {
              case 404:
                this.msgService.show(errorObj.description, "error");
                break;
              case 409:
                this.msgService.show("Un compte existe déjà pour "+this.registerForm.get('userName')?.value, "error");
                this.registerForm.patchValue({userName:""});
                break;
              default:
                this.msgService.show("code Http: "+errorObj.description+ "description: "+errorObj.description, "error");
            }          
          }
        }
        
      })
    }
  }
 
}
