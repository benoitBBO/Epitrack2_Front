import { Component } from '@angular/core';
import { TmdbmovieModel } from '../shared/models/tmdbmovie.model';
import { MovieService } from '../shared/services/movie.service';
import { SerieService } from '../shared/services/serie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbserieModel } from '../shared/models/tmdbserie.model';
import { UserService } from '../shared/services/user.service';
import { UserModel } from '../shared/models/user.model';
import { MessageService } from '../shared/services/message.service';
import { UserMovieService } from '../shared/services/user-movie.service';
import { UserSerieService } from '../shared/services/user-serie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search-tmdb',
  templateUrl: './search-tmdb.component.html',
  styleUrls: ['./search-tmdb.component.css']
})
export class SearchTMDBComponent {
  movies: TmdbmovieModel[] = [];
  series: TmdbserieModel[] = [];
  search_input!:string;
  loggedUser!:UserModel;
  
  constructor(private movieService: MovieService,
              private serieService: SerieService,
              private userService:UserService,
              private userMovie:UserMovieService,
              private userSerie:UserSerieService,
              private msgService:MessageService,
              private route: ActivatedRoute,
              private router: Router,
              private spinner: NgxSpinnerService){};

  ngOnInit() {
    this.userService._loggedUser$.subscribe((user:any) => {
      this.loggedUser=user;
    });

    //TODO routeReuseStrategy deprecated
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.movieService.searchMoviesFromTMDBApi(this.route.snapshot.params['search_input'])
      .subscribe( (data:TmdbmovieModel[]) => this.movies = data);
    this.serieService.searchSeriesFromTMDBApi(this.route.snapshot.params['search_input'])
      .subscribe( (data:TmdbserieModel[]) => this.series = data);
  }

  onClickAddMovie(movieId:number) {
    if (sessionStorage.getItem('token') && this.loggedUser.id !==0 && this.loggedUser.id !== undefined) {
      this.spinner.show();
      this.movieService.getMovieTmdbById(movieId)
      .subscribe( (movie:any) => {
        this.movieService.postNewMovie(movie).subscribe((newMovieId) => {
          this.userMovie.postUserMovie(newMovieId, this.loggedUser.id) //Ajout du nouveau film dans le catalogue du user
          .subscribe( {
            next: (response:any) => {
              //Mise à jour de la selection User
              this.userMovie._usermovies$ = new BehaviorSubject<any>(response);
              this.msgService.show("Film ajouté avec succès", "success");
              this.router.navigateByUrl("/details/"+ newMovieId + "/Movie/in/catalog");
              this.spinner.hide();
            },
            error: (err:unknown) => {
              if (err instanceof HttpErrorResponse){
                let errorObj = JSON.parse(err.error);
                switch(err.status) {
                  case 404:
                    this.msgService.show(errorObj.description, "error");
                    break;
                  case 409:
                    this.msgService.show("Ce film est déjà suivi", "error");
                    break;
                  default:
                    this.msgService.show("code Http: "+errorObj.description+ "description: "+errorObj.description, "error");
                }          
              }
              this.spinner.hide();
            }
          });
        });
      } )
    } else {
        this.msgService.show("Vous devez être connecté pour accéder à cette fonctionnalité", "error");
        this.router.navigate(['/login']);
    }
  }

  onClickAddSerie(serieId:number) {
      if (sessionStorage.getItem('token') && this.loggedUser.id !==0 && this.loggedUser.id !== undefined) {
      this.spinner.show();
      this.serieService.getSerieTmdbById(serieId)
        .subscribe( (serie:any) => {
          let requests = [];
          let newSerie = serie;
          //Requetes pour avoir les détails des épisodes
          for (let season of serie.seasons) {
            requests.push(this.serieService.getSeasonTmdbById(serieId, season.season_number));
          }
          //Utilisation du forkJoin pour modifier l'objet série avant le post final
          forkJoin(requests).subscribe((responses:any[]) => {
            for(let i = 0; i < responses.length; i++){
              newSerie.seasons[i].episodes = responses[i];
            }
            this.serieService.postNewSerie(newSerie)
              .subscribe((newSerieId:number) => {
                this.userSerie.postUserSerie(newSerieId, this.loggedUser.id) //Ajout de la nouvelle série dans le catalogue du user
                .subscribe( {
                  next: (response:any) => {
                    //Mise à jour de la selection User
                    this.userSerie._userseries$ = new BehaviorSubject<any>(response);
                    this.msgService.show("Série ajoutée avec succès", "success");
                    this.router.navigateByUrl("/details/"+ newSerieId + "/Serie/in/catalog");
                    this.spinner.hide();
                  },
                  error: (err:unknown) => {
                    if (err instanceof HttpErrorResponse){
                      let errorObj = JSON.parse(err.error);
                      switch(err.status) {
                        case 404:
                          this.msgService.show(errorObj.description, "error");
                          break;
                        case 409:
                          this.msgService.show("Ce film est déjà suivi", "error");
                          break;
                        default:
                          this.msgService.show("code Http: "+errorObj.description+ "description: "+errorObj.description, "error");
                      }          
                    }
                    this.spinner.hide();
                  }
                });
              });
          });
        } )
        
    } else {
        this.msgService.show("Vous devez être connecté pour accéder à cette fonctionnalité", "error");
        this.router.navigate(['/login']);
    }
  }

}
