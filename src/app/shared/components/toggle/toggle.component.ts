import {Component, Input} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import { UserMovieService } from '../../services/user-movie.service';
import { UserSerieService } from '../../services/user-serie.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css'],
  standalone: true,
  imports: [MatSlideToggleModule, FormsModule]
})
export class ToggleComponent {
  @Input() status!:string;
  @Input() userVideoId!:number;
  @Input() videoType!:String;
  checked = false;

  constructor(private userMovieService: UserMovieService,
              private userSerieService: UserSerieService,
              private messageService: MessageService          
            ){}

  ngOnInit(){
    if (this.status == "WATCHED") {
      this.checked = true;
    }
  }
  
  changed(){
    console.log(this.checked)
    //appel update status usermovie ou userserie
    this.status = "UNWATCHED";
    if (this.checked) {
      this.status = "WATCHED"
    }
    switch (this.videoType) {
      case 'MOVIE': 
        this.userMovieService.changeStatusUserMovie(this.userVideoId, this.status);
        break;
      case 'SERIE':
        //this.userSerieService.changeStatusUserSerie(this.userVideoId, this.status);
        console.log("change status serie)");
        break;
      default:
        this.messageService.show("Erreur type de video inconnu", "error");
    }
  }
}
