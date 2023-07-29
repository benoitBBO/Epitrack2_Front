import { Component, ElementRef, ViewChild } from '@angular/core';
import { MovieModel } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';
import { SerieService } from '../shared/services/serie.service';
import { SerieModel } from '../shared/models/serie.model';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UserService } from '../shared/services/user.service';
import { UserModel } from '../shared/models/user.model';
import { UsermovieModel } from '../shared/models/usermovie.model';
import { UserMovieService } from '../shared/services/user-movie.service';
import { UserserieModel } from '../shared/models/userserie.model';
import { UserSerieService } from '../shared/services/user-serie.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  
  searchMovies: MovieModel[] = [];
  searchSeries: SerieModel[] = [];
  searchVideos: any[] = [];
  userMovies!: UsermovieModel[];
  userSeries!: UserserieModel[];
  noResult:boolean = false;
  @ViewChild("tagSaisie", { static: false }) input!: ElementRef<any>;

  constructor(private movieService: MovieService,
              private serieService: SerieService,
              private router:Router,
              private userMovieService: UserMovieService,
              private userSerieService: UserSerieService) {
  }

  ngOnInit(){
    //Récupération du catalogue userMovies
    this.userMovieService._usermovies$.subscribe(data => this.userMovies = data);

    //Récupération du catalogue userSeries
    this.userSerieService._userseries$.subscribe(data => this.userSeries = data);
  }

  onKeyUp(saisie: string){
    if (saisie.length > 2) {
      this.movieService.searchMoviesFromApi(saisie)
        .subscribe((movies:MovieModel[]) => {
          this.searchVideos = [];
          this.searchVideos.push(...movies)
        });
      this.serieService.searchSeriesFromApi(saisie)
        .subscribe((series:SerieModel[]) => {
          this.searchVideos.push(...series)
          this.noResult = (this.searchVideos.length === 0);
        });
    } else {
      this.noResult = false;
    }
  }

  onSelection(event:MatAutocompleteSelectedEvent){ 
    if(event.option.value.type === "Movie"){
      this.redirectToDetail("/details/"+ event.option.value.id + "/Movie/"+ (this.isNotInCatalog(event.option.value.id, event.option.value.type) ? "out" : "in") +"/catalog");
    } else if (event.option.value.type === "Serie"){
      this.redirectToDetail("/details/"+ event.option.value.id + "/Serie/"+ (this.isNotInCatalog(event.option.value.id, event.option.value.type) ? "out" : "in") +"/catalog");
    } else { //TMDB
      this.redirectToDetail("/searchTMDB/"+ this.input.nativeElement.value);
      this.noResult = false;
    }
  }

  redirectToDetail(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([uri]));

    //RAZ de la recherche
    this.searchVideos = [];
    this.input.nativeElement.value = '';
 }

 isNotInCatalog(idVideo:Number, videoType: string){
  if(sessionStorage.length > 0){
    if(videoType === "Movie"){
      for(let userMovie of this.userMovies){
        if(userMovie.movie.id === idVideo){
          return false;
        }
      }
      return true;
    } else {
      for(let userSerie of this.userSeries){
        if(userSerie.serie.id === idVideo){
          return false;
        }
      }
      return true;
    }
  }
  return true;
}
  
}
