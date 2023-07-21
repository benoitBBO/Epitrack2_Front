import { Component } from '@angular/core';
import { UserserieModel } from '../shared/models/userserie.model';
import { Router } from '@angular/router';
import { UserSerieService } from '../shared/services/user-serie.service';

@Component({
  selector: 'app-user-serie-list',
  templateUrl: './user-serie-list.component.html',
  styleUrls: ['./user-serie-list.component.css']
})
export class UserSerieListComponent {
  series: UserserieModel[] = [];
  serie!: UserserieModel;

  constructor(private router:Router,
              private userSerieService:UserSerieService) {
    console.log("constructor UserSerieService : ", this);
  }

  ngOnInit() {
    //requete get API
    if (this.router.url == '/user') {
      this.userSerieService.getBest4UserSeriesFromApi();
    } else if (this.router.url == '/user/series') {
      this.userSerieService.getUserSeriesFromApi();
    }
    this.userSerieService.userseries$.subscribe( data => this.series = data);
  }
}
