import { Component } from '@angular/core';
import { SerieModel } from '../shared/models/serie.model';
import { SerieService } from '../shared/services/serie.service';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrls: ['./serie-list.component.css']
})
export class SerieListComponent {
  series: SerieModel[] = [];
  serie!: SerieModel;

  constructor(private service: SerieService) {
    console.log("constructor SerieService : ", this);
  }

  ngOnInit() {
    //requete get API
    console.log("ng init serie list");
    this.service.getBest4SeriesFromApi();
    //abonné aux changements du service series$
    this.service.series$.subscribe( data => this.series = data);
  }
}
