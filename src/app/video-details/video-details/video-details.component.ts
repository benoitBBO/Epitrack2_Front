import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MovieModel } from 'src/app/shared/models/movie.model';
import { SerieModel } from 'src/app/shared/models/serie.model';
import { UsermovieModel } from 'src/app/shared/models/usermovie.model';
import { MovieService } from 'src/app/shared/services/movie.service';
import { SerieService } from 'src/app/shared/services/serie.service';
import { UserMovieService } from 'src/app/shared/services/user-movie.service';

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
  shortListActors: string[] = [];
  loaded: boolean = false;
  userMovies!: UsermovieModel[];
  userMovie!: UsermovieModel;
  previousPage!: string;


  constructor(
    private movieService: MovieService,
    private serieService: SerieService,
    private route: ActivatedRoute,
    private userMovieService: UserMovieService){}

    

  ngOnInit() {
    //Recupération du catalogue userMovies
    this.userMovieService._usermovies$.subscribe(data => this.userMovies = data);

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
          for(let i = 0; i < 5; i++){
            this.shortListActors.push(this.movie.actors[i].name);
          }

        });
      } else { //Utilisateur connecté
        if(this.userOwned === "out"){ //Film non suivi
          this.movieService.getMovieById(this.id).subscribe( data => {
            this.movie = data;
            this.loaded = true;

            //Gestion des acteurs pour affichage
            for(let i = 0; i < 5; i++){
              this.shortListActors.push(this.movie.actors[i].name);
            }
          });
        } else { //Film suivi
          this.userMovieService.getUserMovieById(this.id).subscribe( data => {
            this.movie = data.movie;
            this.userMovie = data;
            this.loaded = true;

            //Gestion des acteurs pour affichage
            for(let i = 0; i < 5; i++){
              this.shortListActors.push(this.movie.actors[i].name);
            }
          });
        }

      }
      
    } else {
      this.serieService.getSerieById(this.id).subscribe( data => {
        this.serie = data;
        this.loaded = true;
        this.activeSeason = this.serie.seasons[0]; //##TODO possibilité de gérer dynamiquement en fonction d'où en était le visionnage

        //Gestion des acteurs pour affichage
        for(let i = 0; i < 5; i++){
          this.shortListActors.push(this.serie.actors[i].name);
        }
      });
    }

    //Initialisation de la liste de 10 acteurs

  }

  onClickSeasonCard(event: MouseEvent, seasonNumber: number){
    this.activeSeason = this.serie.seasons[seasonNumber-1];
  }

  getUserVideoId(type:string, id:string){
    let movieId;
    if(type === "Movie"){
      for(let userMovie of this.userMovies){
        if(userMovie.movie.id.toString() === id){
          movieId = userMovie.id;
        }
      }
    } else { //#TODO Series
      movieId = id;
    }
    
    return movieId;
  }

  onClickCollapsible(event:any){
    event.currentTarget.classList.toggle('open');
  }


  
}
