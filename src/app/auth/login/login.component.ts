import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!:FormGroup;
  isSubmitted:boolean = false;
  
  constructor(private fb:FormBuilder,
            private userService:UserService
              // private msgService:MessageService,
              // private router:Router
              ){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required]]
    });
  }

  onLoginSubmit(ev:Event){
    this.isSubmitted = true;
    if(this.loginForm.valid){
      this.userService.login(this.loginForm.value);
    }
  }
  

}