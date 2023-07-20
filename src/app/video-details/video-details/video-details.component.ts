import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MovieModel } from 'src/app/shared/models/movie.model';
import { SerieModel } from 'src/app/shared/models/serie.model';
import { MovieService } from 'src/app/shared/services/movie.service';
import { SerieService } from 'src/app/shared/services/serie.service';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})

export class VideoDetailsComponent {
  id!: number;
  type!: string;
  movie!: MovieModel;
  serie!: SerieModel;
  activeSeason!: any;
  actors!: string[];
  loaded: boolean = false;


  constructor(
    private movieService: MovieService,
    private serieService: SerieService,
    private route: ActivatedRoute){}

  ngOnInit() {
    //Params recovery for Get Request
    this.id = this.route.snapshot.params['id'];
    this.type = this.route.snapshot.params['type'];

    if(this.type === "Movie"){
      this.movieService.getMovieById(this.id).subscribe( data => {
        this.movie = data;
        this.loaded = true;
      });
    } else {
      this.serieService.getSerieById(this.id).subscribe( data => {
        this.serie = data;
        this.loaded = true;
        this.activeSeason = this.serie.seasons[0];
      });
    }  
  }

  onClickSeasonCard(event: MouseEvent, seasonNumber: number){
    this.activeSeason = this.serie.seasons[seasonNumber-1];
  }
  
}
