import { Pipe, PipeTransform } from '@angular/core';
import { UsermovieModel } from '../models/usermovie.model';
import { UserMovieService } from '../services/user-movie.service';
import { UserSerieService } from '../services/user-serie.service';
import { UserserieModel } from '../models/userserie.model';

@Pipe({
  name: 'isInCatalog'
})
export class IsInCatalogPipe implements PipeTransform {
  userMovies!: UsermovieModel[];
  userSeries!: UserserieModel[];

  constructor(private userMovie:UserMovieService,
              private userSerie: UserSerieService) {
  }

  transform(idVideo:Number,typeVideo:String):boolean{
    if (typeVideo == 'Movie') {
      this.userMovie._usermovies$.subscribe(data => {
        this.userMovies = data;
        console.log("recherche dans isInCatalog, _usermovies$ : ",data);
        if(sessionStorage.length > 0){
          for(let userMovie of this.userMovies){
            if(userMovie.movie.id === idVideo){
              return false;
            }
          }
          return true;
        }
        return true;
      });
      return true;
      
    } else {
      this.userSerie._userseries$.subscribe(data => {
        this.userSeries = data;
        console.log("recherche dans isInCatalog, _userseries$ : ",data);
        if(sessionStorage.length > 0 && this.userSeries != null){
          for(let userSerie of this.userSeries){
            if(userSerie.serie.id === idVideo){
              return false;
            }
          }
          return true;
        }
        return true;
      });
      return true;
    }
  }
}
