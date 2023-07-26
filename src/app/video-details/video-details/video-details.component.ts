import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MovieModel } from 'src/app/shared/models/movie.model';
import { SerieModel } from 'src/app/shared/models/serie.model';
import { UsermovieModel } from 'src/app/shared/models/usermovie.model';
import { UserseasonModel } from 'src/app/shared/models/userseason.model';
import { UserserieModel } from 'src/app/shared/models/userserie.model';
import { MovieService } from 'src/app/shared/services/movie.service';
import { SerieService } from 'src/app/shared/services/serie.service';
import { UserMovieService } from 'src/app/shared/services/user-movie.service';
import { UserSerieService } from 'src/app/shared/services/user-serie.service';

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
  userMovies!: UsermovieModel[];
  userMovie!: UsermovieModel;
  userSeries!: UserserieModel[];
  userSerie!: UserserieModel;
  previousPage!: string;


  constructor(
    private movieService: MovieService,
    private serieService: SerieService,
    private route: ActivatedRoute,
    private userMovieService: UserMovieService,
    private userSerieService: UserSerieService){}

    

  ngOnInit() {
    //Recupération du catalogue userMovies et userSeries
    this.userMovieService._usermovies$.subscribe(data => this.userMovies = data);
    this.userSerieService._userseries$.subscribe(data => this.userSeries = data);

    //Recupération du catalogue userSeries
    //##TODO
    

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
        this.serieService.getSerieById(this.id).subscribe( data => {
          this.serie = data;
          this.loaded = true;
          this.activeSeason = this.serie.seasons[0]; //##TODO possibilité de gérer dynamiquement en fonction d'où en était le visionnage
  
          //Gestion des acteurs pour affichage
          this.displayActors(this.serie);

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
            //##Inversion des saisons et episodes suite retour back?
            data = this.reverseArrays(data);
            this.userCatalogView = true;
            this.userSerie = data;
            this.serie = data.serie;
            this.loaded = true;
            this.userSeasons = data.userSeasons;
            this.activeSeason = data.userSeasons[0]; //##TODO possibilité de gérer dynamiquement en fonction d'où en était le visionnage
    
            //Gestion des acteurs pour affichage
            this.displayActors(this.serie);
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

  reverseArrays(userSerie:any){
    for(let i = 0; i < userSerie.userSeasons.length; i++){
      userSerie.userSeasons[i].userEpisodes = userSerie.userSeasons[i].userEpisodes.reverse();
    }

    userSerie.userSeasons = userSerie.userSeasons.reverse();

    return userSerie;
    
  }


  
}
