import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { MovieModel } from 'src/app/shared/models/movie.model';
import { SeasonModel } from 'src/app/shared/models/season.model';
import { SerieModel } from 'src/app/shared/models/serie.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { UsermovieModel } from 'src/app/shared/models/usermovie.model';
import { UserseasonModel } from 'src/app/shared/models/userseason.model';
import { UserserieModel } from 'src/app/shared/models/userserie.model';
import { MessageService } from 'src/app/shared/services/message.service';
import { MovieService } from 'src/app/shared/services/movie.service';
import { SerieService } from 'src/app/shared/services/serie.service';
import { UserMovieService } from 'src/app/shared/services/user-movie.service';
import { UserSerieService } from 'src/app/shared/services/user-serie.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})

export class VideoDetailsComponent {
  id!: number;
  type!: string;
  userOwned!:string;
  movie!: MovieModel;
  serie!: SerieModel;
  activeSeason!: any;
  userSeasons!: UserseasonModel[];
  shortListActors: string[] = [];
  loaded: boolean = false;
  userCatalogView: boolean = false;
  loggedUser!:UserModel;
  userMovies!: UsermovieModel[];
  userMovie!: UsermovieModel;
  userSeries!: UserserieModel[];
  userSerie!: UserserieModel;
  previousPage!: string;
  isSeasonNumberZero: boolean = false;
  @ViewChild("collapsibleDiv", { static: false }) collapseDiv!: ElementRef<any>;


  constructor(
    private movieService: MovieService,
    private serieService: SerieService,
    private route: ActivatedRoute,
    private router:Router,
    private userMovieService: UserMovieService,
    private userSerieService: UserSerieService,
    private messageService : MessageService,
    private userService:UserService,
    private spinner: NgxSpinnerService
    ){}

    

  ngOnInit() {
    //Recupération du catalogue userMovies et userSeries
    this.userMovieService._usermovies$.subscribe(data => this.userMovies = data);
    this.userMovieService._usermovie$.subscribe(data => this.userMovie = data);
    this.userSerieService._userseries$.subscribe(data => this.userSeries = data); 
    
    this.userService._loggedUser$.subscribe((user:any) => {
      this.loggedUser=user;
    });

    //Params recovery for Get Request
    this.userOwned = this.route.snapshot.params['isInCatalog'];
    this.type = this.route.snapshot.params['type'];
    this.id;
    this.previousPage = this.route.snapshot.params['whereFrom'];

    //Definition de l'id selon le type de user
    if(this.previousPage !== "userCatalog"){
      this.id = this.userOwned === "out" ? this.route.snapshot.params['id'] : this.getUserVideoId(this.type, this.route.snapshot.params['id'])
    } else {
      this.id = this.route.snapshot.params['id'];
    }
    
    this.spinner.show();
    if(this.type === "Movie"){
      if(sessionStorage.length === 0 || this.userOwned === "out"){ //Si Utilisateur non connecté ou connecté mais film non suivi
        this.movieService.getMovieById(this.id).subscribe( data => {
          this.loadMovieView(data, "out");
        });
      } else { //Utilisateur connecté et film suivi
        this.userMovieService.getUserMovieById(this.id).subscribe( data => {
          this.loadMovieView(data, "in");
        });

      }
      
    } else {
      if(sessionStorage.length === 0 || this.userOwned === "out"){ //Si Utilisateur non connecté
        this.serieService.getSerieById(this.id).subscribe( {
          next: (data:SerieModel) => {
            this.loadSerieView(data, "out");
          },
          error: (err:unknown) => {
            if (err instanceof HttpErrorResponse){
              this.messageService.show("erreur dans le détail de la série", "error");
            }
          }
        });
      } else { //Utilisateur connecté & inCatalogue
        this.userSerieService.getUserSerieById(this.id).subscribe( data => {
          this.loadSerieView(data, "in");

          //Abonnement au changement sur userSerie 
          //(pour actualiser la page détail user-serie, notamment quand changement toggle status)
          this.userSerieService._userserie$ = new BehaviorSubject<any>(data);
          this.userSerieService._userserie$.subscribe(data => 
            {
              this.userSeasons = data.userSeasons;
              this.userSerie = data;
              this.isSeasonNumberZero = this.doesSeasonsIncludesZero(this.userSerie.userSeasons, "userSerie");
              let activeSeasonNumber:number = this.activeSeason.season.seasonNumber;
              this.activeSeason = data.userSeasons[this.isSeasonNumberZero ? activeSeasonNumber : activeSeasonNumber-1];
            }
          );
        });

      }
    }
  }

  loadMovieView(data:any, type:string){
    if(type === "in"){
      this.userCatalogView = true;
      this.movie = data.movie;
      this.userMovie = data;
      this.loaded = true;
    } else {
      this.movie = data;
      this.loaded = true;
    }
    
    //Gestion des acteurs pour affichage
    this.displayActors(this.movie);
    this.spinner.hide();
  }

  loadSerieView(data:any, type:string){
    if(type === "in"){
      this.userCatalogView = true;
      this.userSerie = data;
      this.serie = data.serie;
      this.loaded = true;
      this.userSeasons = data.userSeasons;
      this.isSeasonNumberZero = this.doesSeasonsIncludesZero(this.userSerie.userSeasons, "userSerie");
      this.activeSeason = data.userSeasons[0]; //##TODO possibilité de gérer dynamiquement en fonction d'où en était le visionnage

    } else {
      this.serie = data;
      this.loaded = true;
      this.isSeasonNumberZero = this.doesSeasonsIncludesZero(this.serie.seasons, "serie");
      this.activeSeason = this.serie.seasons[0];
    }

    //Gestion des acteurs pour affichage
    this.displayActors(this.serie);
    this.spinner.hide();
  }

  doesSeasonsIncludesZero(seasonsArray:any, type:string){
    let boolean = false;
    if(type === "serie"){
      for(let season of seasonsArray){
        if(season.seasonNumber === 0){
          boolean = true;
        }
      }
    } else {
      for(let userSeason of seasonsArray){
        if(userSeason.season.seasonNumber === 0){
          boolean = true;
        }
      }
    }

    return boolean;
  }

  onClickSeasonCard(event: MouseEvent, seasonNumber: number){
    let index = this.isSeasonNumberZero ? seasonNumber : seasonNumber - 1
    this.activeSeason = this.userCatalogView ? this.userSeasons[index] : this.serie.seasons[index];
  }

  getUserVideoId(type:string, id:string){
    let movieId;
    if(type === "Movie"){
      for(let userMovie of this.userMovies){
        if(userMovie.movie.id.toString() === id){
          movieId = userMovie.id;
        }
      }
    } else {
      for(let userSerie of this.userSeries){
        if(userSerie.serie.id.toString() === id){
          movieId = userSerie.id;
        }
      }
    }
    
    return movieId;
  }

  onClickCollapsible(){
    this.collapseDiv.nativeElement.classList.toggle('open');
  }

  displayActors(videoObj:any){
    for(let i = 0; i < (videoObj.actors.length < 5 ? videoObj.actors.length  : 5); i++){
      this.shortListActors.push(videoObj.actors[i].name);
    }
  }

  onClickAddMovie(idMovie:Number) {
    if (sessionStorage.getItem('token') && this.loggedUser.id !==0 && this.loggedUser.id !== undefined) {
        this.userService._loggedUser$.subscribe((user:any) => {
        this.loggedUser=user;
        this.spinner.show();
        this.userMovieService.postUserMovie(idMovie, this.loggedUser.id)
          .subscribe( {
            next: (response:any) => {
              //Mise à jour de la selection User
              this.userMovieService._usermovies$ = new BehaviorSubject<any>(response);
              this.userMovie = this.findUserVideByVideoId(response);
              
              this.messageService.show("Film ajouté avec succès", "success");
              this.userOwned = "in";
              this.spinner.hide();
            },
            error: (err:unknown) => {
              if (err instanceof HttpErrorResponse){
                let errorObj = JSON.parse(err.error);
                switch(err.status) {
                  case 404:
                    this.messageService.show(errorObj.description, "error");
                    break;
                  case 409:
                    this.messageService.show("Ce film est déjà suivi", "error");
                    break;
                  default:
                    this.messageService.show("code Http: "+errorObj.description+ "description: "+errorObj.description, "error");
                }          
              }
              this.spinner.hide();
            }
          });
        });
    } else {
        this.router.navigate(['/login']);
    }
  }

  onClickWithdrawMovie(idMovie:Number) {
    this.userService._loggedUser$.subscribe((user:any) => {
      this.loggedUser=user;

      this.spinner.show();
      this.userMovieService.deleteUserMovie(idMovie, this.loggedUser.id)
        .subscribe( {
          next: (response:any) => {
            //Mise à jour de la selection User
            this.userMovieService._usermovies$ = new BehaviorSubject<any>(response);

            this.messageService.show("Film retiré du catalogue avec succès", "success");
            this.userOwned = "out";
            this.spinner.hide();
          },
          error: (err:unknown) => {
            if (err instanceof HttpErrorResponse){
              let errorObj = JSON.parse(err.error);
              switch(err.status) {
                case 404:
                  this.messageService.show(errorObj.description, "error");
                  break;
                default:
                  this.messageService.show("code Http: "+errorObj.description+ "description: "+errorObj.description, "error");
              }          
            }
            this.spinner.hide();
          }
        });
      });
  };

  onClickAddSerie(serieId:number) {
    if (sessionStorage.getItem('token') && (this.loggedUser.id !==0 && this.loggedUser.id !== undefined)) {
      this.spinner.show();
      this.userSerieService.postUserSerie(serieId, this.loggedUser.id)
        .subscribe( {
          next: (response:any) => {
            //Mise à jour de la selection User
            this.userSerieService._userseries$ = new BehaviorSubject<any>(response);
            this.userSerie = this.findUserVideByVideoId(response);
            // this.userOwned = "in";

            //Refresh de la page
            this.messageService.show("Série ajoutée avec succès", "success");
            this.redirectTo(this.router.url.replace("/out/catalog", "/in/catalog"));
            this.spinner.hide();
          },
          error: (err:unknown) => {
            if (err instanceof HttpErrorResponse){
              let errorObj = JSON.parse(err.error);
              switch(err.status) {
                case 404:
                  this.messageService.show(errorObj.description, "error");
                  break;
                case 409:
                  this.messageService.show("Cette série est déjà suivie", "error");
                  break;
                default:
                  this.messageService.show("code Http: "+errorObj.description+ "description: "+errorObj.description, "error");
              }          
            }
            this.spinner.hide();
          }
        })
    } else {
        this.router.navigate(['/login']);
    }
  }

  onClickWithdrawSerie(serieId:number) {
    this.userService._loggedUser$.subscribe((user:any) => {
      this.loggedUser=user;

      this.spinner.show();
      this.userSerieService.deleteUserSerie(serieId, this.loggedUser.id)
        .subscribe( {
          next: (response:any) => {
            //Mise à jour de la selection User
            this.userSerieService._userseries$ = new BehaviorSubject<any>(response);
            // this.userOwned = "out";

            //Refresh de la page
            this.redirectTo(this.router.url.replace("/in/catalog", "/out/catalog"));
            this.messageService.show("Serie retirée du catalogue avec succès", "success");
            this.spinner.hide();
          },
          error: (err:unknown) => {
            if (err instanceof HttpErrorResponse){
              let errorObj = JSON.parse(err.error);
              switch(err.status) {
                case 404:
                  this.messageService.show(errorObj.description, "error");
                  break;
                default:
                  this.messageService.show("code Http: "+errorObj.description+ "description: "+errorObj.description, "error");
              }          
            }
            this.spinner.hide();
          }
        });
      });
  };

  findUserVideByVideoId(userVideoArray:any[]):any{
    let videoProperty:string = this.type === "Movie" ? "movie" : "serie";
    let currentVideo = this.type === "Movie" ? this.movie : this.serie;
    let userVideoFinal!:UsermovieModel | UserserieModel;

    for(let userVideo of userVideoArray){
      if(userVideo[videoProperty].id === currentVideo.id){
        userVideoFinal = userVideo;
      }
    }
    return userVideoFinal;
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([uri]));
 }

  
}
