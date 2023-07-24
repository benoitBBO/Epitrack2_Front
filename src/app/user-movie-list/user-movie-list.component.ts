import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserMovieService } from '../shared/services/user-movie.service';
import { Router } from '@angular/router';
import { UsermovieModel } from '../shared/models/usermovie.model';
import { UserModel } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-movie-list',
  templateUrl: './user-movie-list.component.html',
  styleUrls: ['./user-movie-list.component.css']
})
export class UserMovieListComponent {
  movies: UsermovieModel[] = [];
  movie!: UsermovieModel;
  loggedUser!:UserModel;

  // @ViewChild("toggleVideo0") toggle!:ElementRef;
  
  constructor(private router:Router,
              private userMovie:UserMovieService,
              private userService:UserService) {
    console.log("constructor MovieService : ", this);
  }

  ngOnInit() {
    //charger loggedUSer
    this.userService._loggedUser$.subscribe((user:any) => this.loggedUser=user );
    //requete get API
    if (this.router.url == '/user') {
      this.userMovie.getBest4UserMoviesFromApi(this.loggedUser.id);
    } else if (this.router.url == '/user/movies') {
      this.userMovie.getUserMoviesFromApi(this.loggedUser.id);
    }
    this.userMovie.usermovies$.subscribe( data => this.movies = data);
  }

  // ngAfterViewInit(){
  //   console.log(this.toggle);
  // }
}
