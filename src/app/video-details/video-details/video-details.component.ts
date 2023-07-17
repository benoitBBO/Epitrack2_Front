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


  constructor(
    private movieService: MovieService,
    private serieService: SerieService,
    private router: Router,
    private route: ActivatedRoute){}

  ngOnInit() {
    //Params recovery for Get Request
    this.route.queryParams
      .subscribe(params => {
        this.id = params['id'];
        this.type = params['type'];
      })


    if(this.type === "Movie"){
      this.movieService.getMovieById(this.id);
      this.movieService.movie$.subscribe( data => this.movie = data);
    } else {
      this.serieService.getSerieById(this.id);
      this.serieService.serie$.subscribe( data => this.serie = data);
    }

  }

}
