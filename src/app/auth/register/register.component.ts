import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
            private userService:UserService
              // private msgService:MessageService,
              // private router:Router
              ){}

  ngOnInit(){
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
    if(this.registerForm.valid){
      this.userService.register(this.registerForm.value)
      .subscribe( {
        next: (response:any) => {
          console.log("inscription ok"+response);
        //comment faire pour que le http response 201 soit dans le next et pas dans error ?
        //  this.userService.login({this.registerForm.value.userName, this.registerForm.value.password})
        }
      })
    }
  }
 
}
