import { Component } from '@angular/core';
import { UserModel } from './shared/models/user.model';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'epitrack2_front';
  loggedUser!: UserModel;
  

  constructor(private userService:UserService){}

  ngOnInit() {
    console.log("ngOnInit de app-component");
    //charger loggedUSer
    this.userService._loggedUser$.subscribe((user:any) => this.loggedUser=user );
    console.log(this.loggedUser);
   

  }
  
}
