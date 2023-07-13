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
      username:['', [Validators.required]],
      firstname:[''],
      lastname:[''],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onRegisterSubmit(ev:Event){
    this.isSubmitted = true;
    if(this.registerForm.valid){
      this.userService.register(this.registerForm.value)
      //  .subscribe( )
    }
  }
 

}
