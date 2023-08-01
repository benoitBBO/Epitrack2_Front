import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SerieModel } from '../models/serie.model';
import { TmdbserieModel } from '../models/tmdbserie.model';
import { TmdbserieDetailDtoModel } from '../models/tmdbserie-detail-dto.model';
import { TmdbepisodeDetailDtoModel } from '../models/tmdbepisode-detail-dto.model';
import { TmdbseasonDetailDtoModel } from '../models/tmdbseason-detail-dto.model';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  EPITRACK_API = 'http://localhost:8080/api/v1';
  TMDB_API = 'https://api.themoviedb.org/3';
  APIKEY_TMDB = '503f9b6e89ed3a77b5a426dbc8e1094f';

  private _series$ = new BehaviorSubject<SerieModel[]>([]);
  private _serie$ = new BehaviorSubject<any>(SerieModel);
  private _serieId$ = new BehaviorSubject<number>(777);

  constructor(private http: HttpClient) {
    console.log("construteur Serie => ", this)
  }

  getSeriesFromApi():Observable<SerieModel[]> {
    let endpoint = '/series';
    return this.http.get( this.EPITRACK_API + endpoint)
      .pipe( map( (response:any) => 
            response.map((serie:any) => new SerieModel(serie)) ) );
  }

  getBest4SeriesFromApi():Observable<SerieModel[]> {
    let endpoint = '/series/best4';
    return this.http.get( this.EPITRACK_API + endpoint)
      .pipe( map( (response:any) => 
            response.map((serie:any) => new SerieModel(serie)) ) );
  }

  searchSeriesFromApi(saisieRch:string):Observable<SerieModel[]> {
    let endpoint = '/series/search';
    let options = new HttpParams()
      .set('query', saisieRch)
    return this.http.get( this.EPITRACK_API + endpoint, {params:options})
    // on map la reponse pour que le compoment ait un SerieModel[]
      .pipe( map( (response:any) => 
            response.map((serie:any) => new SerieModel(serie)) ) )
  }

  getSerieById(id: number):Observable<SerieModel> {
    let endpoint = '/series/' + id;
    return this.http.get(this.EPITRACK_API + endpoint)
          .pipe( map( (response:any) => 
            new SerieModel(response)) );
  }

  searchSeriesFromTMDBApi(saisieRch:string):Observable<TmdbserieModel[]> {
    let endpoint = '/search/tv';
    let options = new HttpParams()
      .set('api_key', this.APIKEY_TMDB)
      .set('query', saisieRch)
      .set('language', 'fr')
    return this.http.get( this.TMDB_API + endpoint, {params:options})
      .pipe( map( (response:any) => 
            response.results.map((serie:any) => new TmdbserieModel(serie)) ) )
  }

  getSerieTmdbById(serieId:number) {
    let endpoint = '/tv/';
    let options = new HttpParams()
      .set('api_key', this.APIKEY_TMDB)
      .set('append_to_response','credits')
      .set('language', 'fr')
    return this.http.get( this.TMDB_API + endpoint + serieId, {params:options})
      .pipe( map( (response:any) => new TmdbserieDetailDtoModel(response) ) )
  }

  postNewSerie(serie:TmdbserieDetailDtoModel): Observable<number> {
    return this.http.post<number>(this.EPITRACK_API + '/series', serie)
      .pipe((response) => { return response })
  }
  
  getSeasonTmdbById(serieId:number, seasonNumber:number) {
    let endpoint = '/tv/';
    let options = new HttpParams()
      .set('api_key', this.APIKEY_TMDB)
      .set('language', 'fr')
    return this.http.get( this.TMDB_API + endpoint + serieId + '/season/' +  seasonNumber, {params:options})
      .pipe( map( (response:any) => 
            response.episodes.map((episode:any) => new TmdbepisodeDetailDtoModel(episode)) ) )
  }


  get series$():Observable<SerieModel[]> {
    return this._series$.asObservable();
  }
  setSeries$(data: SerieModel[]) {
    this._series$.next(data);
  }

  get serie$():Observable<SerieModel> {
    return this._serie$.asObservable();
  }
  setserie$(data: SerieModel) {
    this._serie$.next(data);
  }
}
