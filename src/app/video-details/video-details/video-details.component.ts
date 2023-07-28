import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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


  constructor(
    private movieService: MovieService,
    private serieService: SerieService,
    private route: ActivatedRoute,
    private router:Router,
    private userMovieService: UserMovieService,
    private userSerieService: UserSerieService,
    private messageService : MessageService,
    private userService:UserService
    ){}

    

  ngOnInit() {
    //Recupération du catalogue userMovies et userSeries
    this.userMovieService._usermovies$.subscribe(data => this.userMovies = data);
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
    

    if(this.type === "Movie"){
      if(sessionStorage.length === 0){ //Si Utilisateur non connecté
        this.movieService.getMovieById(this.id).subscribe( data => {
          this.movie = data;
          this.loaded = true;
          
          //Gestion des acteurs pour affichage
          this.displayActors(this.movie);

        });
      } else { //Utilisateur connecté
        if(this.userOwned === "out"){ //Film non suivi
          this.movieService.getMovieById(this.id).subscribe( data => {
            this.movie = data;
            this.loaded = true;

            //Gestion des acteurs pour affichage
            this.displayActors(this.movie);
          });
        } else { //Film suivi
          this.userMovieService.getUserMovieById(this.id).subscribe( data => {
            this.userCatalogView = true;
            this.movie = data.movie;
            this.userMovie = data;
            this.loaded = true;

            //Gestion des acteurs pour affichage
            this.displayActors(this.movie);
          });
        }

      }
      
    } else {
      if(sessionStorage.length === 0){ //Si Utilisateur non connecté
        this.serieService.getSerieById(this.id).subscribe( {
          next: (data:SerieModel) => {
            this.serie = data;
            this.loaded = true;
            this.activeSeason = this.serie.seasons[0]; //##TODO possibilité de gérer dynamiquement en fonction d'où en était le visionnage
    
            //Gestion des acteurs pour affichage
            this.displayActors(this.serie);
  
          },
          error: (err:unknown) => {
            if (err instanceof HttpErrorResponse){
              this.messageService.show("erreur dans le détail de la série", "error");
            }
          }
        });
      } else { //Utilisateur connecté
        if(this.userOwned === "out"){ //Série non suivie
          this.serieService.getSerieById(this.id).subscribe( data => {
            this.serie = data;
            this.loaded = true;
            this.activeSeason = this.serie.seasons[0]; //##TODO possibilité de gérer dynamiquement en fonction d'où en était le visionnage
    
            //Gestion des acteurs pour affichage
            this.displayActors(this.serie);
          });
        } else { //Série suivie
          this.userSerieService.getUserSerieById(this.id).subscribe( data => {
            this.userCatalogView = true;
            this.userSerie = data;
            this.serie = data.serie;
            this.loaded = true;
            this.userSeasons = data.userSeasons;
            this.activeSeason = data.userSeasons[0]; //##TODO possibilité de gérer dynamiquement en fonction d'où en était le visionnage
            
            //Gestion des acteurs pour affichage
            this.displayActors(this.serie);

            //Abonnement au changement sur userSerie 
            //(pour actualiser la page détail user-serie, notamment quand changement toggle status)
            this.userSerieService._userserie$ = new BehaviorSubject<any>(data);
            this.userSerieService._userserie$.subscribe(data => 
              {
                console.log("abonnement userSerie data= ", data);
                console.log("activeSeason=", this.activeSeason);
                this.userSeasons = data.userSeasons;
                this.userSerie = data;
                // SBI : je n'arrive pas à repositionner la vue sur l'activeSeason, au changement de statut
                //this.activeSeason = data.userSeasons[0];
                let activeSeasonNumber:number = this.activeSeason.season.seasonNumber;
                console.log("activeSeasonNumber=", activeSeasonNumber);
                this.activeSeason = data.userSeasons[activeSeasonNumber-1];
              })
          });
        }

      }
    }
  }

  onClickSeasonCard(event: MouseEvent, seasonNumber: number){
    this.activeSeason = this.userCatalogView ? this.userSeasons[seasonNumber-1] : this.serie.seasons[seasonNumber-1];
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

  onClickCollapsible(event:any){
    event.currentTarget.classList.toggle('open');
  }

  displayActors(videoObj:any){
    for(let i = 0; i < 5; i++){
      this.shortListActors.push(videoObj.actors[i].name);
    }
  }

  onClickAddMovie(idMovie:Number) {
    if (sessionStorage.getItem('token') && this.loggedUser.id !==0 && this.loggedUser.id !== undefined) {
        this.userService._loggedUser$.subscribe((user:any) => {
        this.loggedUser=user;
        this.userMovieService.postUserMovie(idMovie, this.loggedUser.id)
          .subscribe( {
            next: (response:any) => {
              //Mise à jour de la selection User
              this.userMovieService._usermovies$ = new BehaviorSubject<any>(response);
              this.userMovie = this.findUserVideByVideoId(response);
              
              this.messageService.show("Film ajouté avec succès", "success");
              this.userOwned = "in";
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
      this.userMovieService.deleteUserMovie(idMovie, this.loggedUser.id)
        .subscribe( {
          next: (response:any) => {
            //Mise à jour de la selection User
            this.userMovieService._usermovies$ = new BehaviorSubject<any>(response);

            this.messageService.show("Film retiré du catalogue avec succès", "success");
            this.userOwned = "out";
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
          }
        });
      });
  };

  onClickAddSerie(serieId:number) {
    if (sessionStorage.getItem('token') && (this.loggedUser.id !==0 && this.loggedUser.id !== undefined)) {
      this.userSerieService.postUserSerie(serieId, this.loggedUser.id)
        .subscribe( {
          next: (response:any) => {
            //Mise à jour de la selection User
            this.userSerieService._userseries$ = new BehaviorSubject<any>(response);
            this.userSerie = this.findUserVideByVideoId(response);
            this.userOwned = "in";
            this.messageService.show("Série ajoutée avec succès", "success");
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
          }
        })
    } else {
        this.router.navigate(['/login']);
    }
  }

  onClickWithdrawSerie(serieId:number) {
    this.userService._loggedUser$.subscribe((user:any) => {
      this.loggedUser=user;
      this.userSerieService.deleteUserSerie(serieId, this.loggedUser.id)
        .subscribe( {
          next: (response:any) => {
            //Mise à jour de la selection User
            this.userSerieService._userseries$ = new BehaviorSubject<any>(response);
            this.userOwned = "out";
            this.messageService.show("Serie retirée du catalogue avec succès", "success");

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

  
}
