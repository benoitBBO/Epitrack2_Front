import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { SerieModel } from '../models/serie.model';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  EPITRACK_API = 'http://localhost:8080/api/v1';
  
  private _series$ = new BehaviorSubject<SerieModel[]>([]);

  constructor(private http: HttpClient) {
    console.log("construteur Serie => ", this)
  }

  getSeriesFromApi():void {
    let endpoint = '/series';
    this.http.get( this.EPITRACK_API + endpoint)
      .pipe( map( (response:any) => 
            response.map((serie:any) => new SerieModel(serie)) ) )
      .subscribe(data => this._series$.next(data))
  }

  getBest4SeriesFromApi():void {
    let endpoint = '/series/best4';
    this.http.get( this.EPITRACK_API + endpoint)
      .pipe( map( (response:any) => 
            response.map((serie:any) => new SerieModel(serie)) ) )
      .subscribe(data => this._series$.next(data))
  }


  get series$():Observable<SerieModel[]> {
    return this._series$.asObservable();
  }
  setSeries$(data: SerieModel[]) {
    this._series$.next(data);
  }
}
