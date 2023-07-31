import { Component } from '@angular/core';
import { UserserieModel } from '../shared/models/userserie.model';
import { Router } from '@angular/router';
import { UserSerieService } from '../shared/services/user-serie.service';
import { MessageService } from '../shared/services/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserModel } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-serie-list',
  templateUrl: './user-serie-list.component.html',
  styleUrls: ['./user-serie-list.component.css']
})
export class UserSerieListComponent {
  series: UserserieModel[] = [];
  originalUserSeries: UserserieModel[] = [];
  serie!: UserserieModel;
  loggedUser!:UserModel;
  currentUrl!: string;

  constructor(private router:Router,
              private userSerieService:UserSerieService,
              private userService:UserService,
              private messageService:MessageService) {
  }

  ngOnInit() {
    //RG pour css Films/Series
    this.currentUrl = this.router.url;
    
    //charger loggedUSer
    this.userService._loggedUser$.subscribe((user:any) => this.loggedUser=user );
    //requete get API
    if (this.router.url == '/user') {
      this.userSerieService.getBest4UserSeriesFromApi(this.loggedUser.id).subscribe( data => this.series = data );

      //Chargement du catalogue à la première connexion
      this.userSerieService.getUserSeriesFromApi(this.loggedUser.id);
    } else if (this.router.url == '/user/series') {
      this.userSerieService.getUserSeriesFromApi(this.loggedUser.id);
      this.userSerieService.userseries$.subscribe( data => {
        this.series = data;
        this.originalUserSeries = data;
      });
    }
    
  }

  
  updateStatusOfUserSerie(userVideoId:number, newStatus:string){
    let oldUserSerieList:UserserieModel[] = [];
    let newUserSerieList:UserserieModel[] = [];
    this.userSerieService.changeStatusUserSerie(userVideoId, newStatus)
      .subscribe({
        next: (response:any) => {
          console.log("next");
          this.messageService.show("statut mis à jour", "success");
          //mise à jour de la vue series (grâce à _userseries$ BehaviorSubject)
          oldUserSerieList = this.userSerieService.userseries;
          oldUserSerieList.forEach(userSerie => {
            if(userSerie.id == userVideoId) {
              userSerie.status = newStatus;
            }
            newUserSerieList=[...newUserSerieList, userSerie];
          });
          this.userSerieService.setUserSeries$(newUserSerieList);
        } ,
        error: (err:unknown) => {
          if (err instanceof HttpErrorResponse){
            this.messageService.show("erreur de mise à jour du statut", "error");
          }
        }
      } )
  }

  onClickStatusBtn(value: string){
    switch(value){
      case "All":
        this.series = this.originalUserSeries;
        break;
      case "UNWATCHED":
        this.series = this.originalUserSeries.filter(userSerie => userSerie.status === value);
        break;
      case "ONGOING":
        this.series = this.originalUserSeries.filter(userSerie => userSerie.status === value);
        break;
      case "WATCHED":
        this.series = this.originalUserSeries.filter(userSerie => userSerie.status === value);
        break;
            
    }
  }
  
}
