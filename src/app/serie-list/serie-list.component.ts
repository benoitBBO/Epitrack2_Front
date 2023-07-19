import { Component } from '@angular/core';
import { SerieModel } from '../shared/models/serie.model';
import { SerieService } from '../shared/services/serie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrls: ['./serie-list.component.css']
})
export class SerieListComponent {
  series: SerieModel[] = [];
  serie!: SerieModel;

  constructor(private service: SerieService, private router:Router) {
    console.log("constructor SerieService : ", this);
  }

  ngOnInit() {
    if (this.router.url == '/') {
      this.service.getBest4SeriesFromApi().subscribe( data => this.series = data);
    } else if (this.router.url == '/series') {
      this.service.getSeriesFromApi().subscribe( data => this.series = data);
    }
  }
}
