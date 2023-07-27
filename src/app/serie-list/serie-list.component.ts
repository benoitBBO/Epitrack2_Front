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
import { BehaviorSubject } from 'rxjs';

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
  dynamicCatalog: any[] = [];
  
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
    //Récupération des userSeries
    this.userSerie._userseries$.subscribe(data => this.userSeries = data);

    if (this.router.url == '/') {
      this.service.getBest4SeriesFromApi().subscribe( data => {
        this.series = data;
        this.loadingDynamicCatalogVariable();
      });
    } else if (this.router.url == '/series') {
      this.service.getSeriesFromApi().subscribe( data => {
        this.series = data
        this.loadingDynamicCatalogVariable();
      });
    }
  }
  onClickAddSerie(serieId:number, index:number) {
    if (sessionStorage.getItem('token') && this.loggedUser) {
      this.userSerie.postUserSerie(serieId, this.loggedUser.id)
        .subscribe( {
          next: (response:any) => {
            //Mise à jour de la selection User
            this.userSerie._userseries$ = new BehaviorSubject<any>(response);
            
            this.msgService.show("Série ajoutée avec succès", "success");
            this.dynamicCatalog[index] = !this.dynamicCatalog[index];
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

  onClickWithdrawSerie(serie:SerieModel, index:number) {
    this.userService._loggedUser$.subscribe((user:any) => {
      this.loggedUser=user;
      this.userSerie.deleteUserSerie(serie.id, this.loggedUser.id)
        .subscribe( {
          next: (response:any) => {
            //Mise à jour de la selection User
            this.userSerie._userseries$ = new BehaviorSubject<any>(response);
            this.msgService.show("Serie retirée du catalogue avec succès", "success");
            this.dynamicCatalog[index] = !this.dynamicCatalog[index];
          },
          error: (err:unknown) => {
            if (err instanceof HttpErrorResponse){
              let errorObj = JSON.parse(err.error);
              switch(err.status) {
                case 404:
                  this.msgService.show(errorObj.description, "error");
                  break;
                default:
                  this.msgService.show("code Http: "+errorObj.description+ "description: "+errorObj.description, "error");
              }          
            }
          }
        });
      });
  };

  loadingDynamicCatalogVariable(){
    if(sessionStorage.length > 0){
      for(let serie of this.series){
        this.dynamicCatalog.push(this.isNotInCatalog(serie.id));
      }
    }
  }

  isNotInCatalog(idSerie:Number){
    if(sessionStorage.length > 0){
      for(let userSerie of this.userSeries){
        if(userSerie.serie.id === idSerie){
          return false;
        }
      }
      return true;
    }
    return true;
  }
}
