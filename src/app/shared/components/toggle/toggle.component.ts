import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatSlideToggleChange, MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import { UserMovieService } from '../../services/user-movie.service';
import { UserSerieService } from '../../services/user-serie.service';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
  //newStatus!:string;
  checked = false;    //false quand satus "A voir" - true quand status 'Déjà vu"
  
  constructor(private userMovieService: UserMovieService,
              private userSerieService: UserSerieService,
              private messageService: MessageService,
              private router: Router         
            ){}

  ngOnInit(){
    if (this.status == "WATCHED") {
      this.checked = true;
    }
  }
  
  changed(event: any){
    if (this.checked) {
      this.status = "WATCHED";
    } else {
      this.status = "UNWATCHED";
    }

    switch (this.videoType) {
      case 'MOVIE': 
        this.changedForMovie();
        break;
      case 'SERIE':
        this.changedForSerie();
        break;
      default:
        this.messageService.show("Erreur type de video inconnu", "error");
    }
  }

  changedForMovie(){
    this.userMovieService.changeStatusUserMovie(this.userVideoId, this.status)
    .subscribe({
      next: () => {
        console.log("Ok next");
        this.messageService.show("statut du film mis à jour", "success");
      },
      error: (err:unknown) => {
        if (err instanceof HttpErrorResponse){
          this.checked = !this.checked;
          this.messageService.show("erreur de mise à jour du statut", "error");
        }
      }
    });
  }

  changedForSerie(){
    // Pour Serie, avant de mettre à jour le statut, on demande confirmation à l'utilisateur
    // car la màj de la serie va entrainer la màj des saisons/épisodes
    let confirmationMessage: string;
    
    if (this.checked) {
      confirmationMessage = 'Confirmez-vous avoir vu la serie ET toutes les saisons/épisodes ?';
    } else {
      confirmationMessage = 'Confirmez-vous vouloir remettre à "A voir" la serie ET toutes les saisons/épisodes ?';
    };
    
    //    si confirme non -> pas d'update en base + inverser this.checked pour le remettre à son état initial
    //    si confirme oui -> update en base serie/saisons/épisodes avec nouveau status
    if (!confirm(confirmationMessage)) {
      this.checked = !this.checked;
    } else {
      this.userSerieService.changeStatusUserSerie(this.userVideoId, this.status)
      .subscribe({
        next: () => this.messageService.show("statut du film mis à jour", "success"),
        error: (err:unknown) => {
          if (err instanceof HttpErrorResponse){
            this.checked = !this.checked;
            this.messageService.show("erreur de mise à jour du statut", "error");
          }
        }
      })
    }
  }
  

}
