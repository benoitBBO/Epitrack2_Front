import {Component, Input} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import { UserMovieService } from '../../services/user-movie.service';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css'],
  standalone: true,
  imports: [MatSlideToggleModule, FormsModule]
})
export class ToggleComponent {
  @Input() status!:string;
  @Input() userMovieId!:number;
  checked = false;

  constructor(private userMovieService: UserMovieService){}

  ngOnInit(){
    if (this.status == "WATCHED") {
      this.checked = true;
    }
  }
  
  changed(){
    this.status = "UNWATCHED";
    if (this.checked) {
      this.status = "WATCHED"
    }
    this.userMovieService.changeStatusUserMovie(this.userMovieId, this.status);
  }
}
