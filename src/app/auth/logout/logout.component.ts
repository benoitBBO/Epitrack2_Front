import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private router:Router,
              private userService:UserService){}

  onClickLogoutYes(){
    this.userService.clearLoggedUser();
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }
           
}
