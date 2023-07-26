import { Component } from '@angular/core';
import { SerieModel } from '../shared/models/serie.model';
import { SerieService } from '../shared/services/serie.service';
import { Router } from '@angular/router';
import { UserserieModel } from '../shared/models/userserie.model';
import { UserModel } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { UserSerieService } from '../shared/services/user-serie.service';
import { MessageService } from '../shared/services/message.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrls: ['./serie-list.component.css']
})
export class SerieListComponent {
  series: SerieModel[] = [];
  serie!: SerieModel;
  userSeries!: UserserieModel[];
  loggedUser!:UserModel;
  
  constructor(private service: SerieService,
              private router:Router,
              private msgService:MessageService,
              private userSerie: UserSerieService,
              private userService:UserService) {
    console.log("constructor SerieService : ", this);
  }

  ngOnInit() {
    this.userService._loggedUser$.subscribe((user:any) => {
      this.loggedUser=user;
    });
    if (this.router.url == '/') {
      this.service.getBest4SeriesFromApi().subscribe( data => this.series = data);
    } else if (this.router.url == '/series') {
      this.service.getSeriesFromApi().subscribe( data => this.series = data);
    }
  }
  onClickAddSerie(serie:SerieModel) {
    console.log('onClickAddSerie===');
    if (sessionStorage.getItem('token') && this.loggedUser) {
      this.userSerie.postUserSerie(serie, this.loggedUser.id)
        .subscribe( {
          next: (response:any) => {
            console.log("retour post userSerie",response);
            this.msgService.show("Série ajoutée avec succès", "success");
          },
          error: (err:unknown) => {
            if (err instanceof HttpErrorResponse){
              let errorObj = JSON.parse(err.error);
              switch(err.status) {
                case 404:
                  this.msgService.show(errorObj.description, "error");
                  break;
                case 409:
                  this.msgService.show("Cette série est déjà suivie", "error");
                  break;
                default:
                  this.msgService.show("code Http: "+errorObj.description+ "description: "+errorObj.description, "error");
              }          
            }
          }
        })
    } else {
        this.router.navigate(['/login']);
    }
  }
}
