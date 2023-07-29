import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserMovieService } from '../../services/user-movie.service';
import { MessageService } from '../../services/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserSerieService } from '../../services/user-serie.service';

@Component({
  selector: 'app-stars',
  //templateUrl: './stars.component.html',
  template : `
  
  <!-- Template score "editable=false" -->
  <div *ngIf="!editable" [innerHTML]="iconStr"></div>

  <!-- Template score "editable=true" -->
  <div *ngIf="editable" id="appStarVote">
    <i 
    [class.fas]="i+1<=this.selectedScore" 
    *ngFor="let item of scoreArray; 
    let i=index" class="far fa-star"
    (click)="onClickStar($event,i)" (mouseover)="onMouseoverStar(i)" (mouseout)="onMouseoutStar()" [ngClass]="{checked:selectedScore>i}"
    ></i>
  </div>
  `,
  styleUrls: ['./stars.component.css']
})

export class StarsComponent {
  @Input() score!:number;
  @Input() editable! : boolean;
  @Input() componentType! : string;
  @Output() selectedScoreEvent = new EventEmitter<number>();
  @Input() selectedScore: number = 0;
  @Input() selectedUserMovie: any;
  @Input() selectedUserSerie: any;
  previousSelection: number = 0;
  iconStr:string = '';
  scoreArray:Array<number> = [];
  userRating:object = {};
  hasVoted:boolean = false;

  constructor(
    private userMovieService: UserMovieService,
    private userSerieService: UserSerieService,
    private msgService:MessageService){}

  ngOnInit() {


    this.editable = this.componentType === 'vote';
    if(!this.editable){ //Mode affichage
      this.score = Math.round(this.score);

      // Affichage des icones Stars
      for (let i=0; i< this.score; i++) {
        this.iconStr += '<i class="fas fa-star">';
      }
      for (let i=this.score; i< 5; i++) {
        this.iconStr += '<i class="far fa-star">';
      }

    } else { //Mode vote
      this.score = this.score === null ? 0 : this.score;
      this.scoreArray = new Array(5).fill(0);
      if(this.score !== null){ //Si score différent de null, alors on présélectionne les étoiles correspondant à la note du User
        this.selectedScore = this.score;
        this.previousSelection = this.selectedScore;    
      }

    }
  }


  onMouseoverStar(index: number) {
    if(!this.hasVoted){
      this.selectedScore = index + 1;
    }
    
  }

  onMouseoutStar() {
    if(!this.hasVoted){
      if( this.previousSelection !==0){
        this.selectedScore = this.previousSelection;
      } else {
        this.selectedScore = 0;
      }
    }

  }

  /*
    Au click sur une étoile, si le component est editable
    > on emet un evenement selectedScoreEvent(selectedScore)
      (le component parent peut alors récupérer la valeur selectedScore)
  */
  onClickStar(event: MouseEvent, index: number) {
    event.stopPropagation()
    if(this.selectedUserMovie !== undefined){
      if(!this.hasVoted){ //Possibilité de voter à la première visite du détail. Second vote possible uniquement après rafraichissement
        this.selectedScore = index + 1;
        this.previousSelection = this.selectedScore;
  
        //Conception du body de la requête
        this.userRating = {
          "previousRating": this.selectedUserMovie.userRating === 0 ? null : this.selectedUserMovie.userRating,
          "newRating": this.selectedScore,
          "userId": this.selectedUserMovie.user.id,
          "userMovieId": this.selectedUserMovie.id,
          "movieId": this.selectedUserMovie.movie.id
        };
  
        //Envoi du PUT pour MAJ de la note
        this.userMovieService.updateUserRating(this.userRating).subscribe( {
          next: (response:any) => {
            console.log("retour post updateRating",response);
            this.msgService.show("Votre vote a bien été pris en compte", "success");
            this.hasVoted = true;
          },
          error: (err:unknown) => {
            if (err instanceof HttpErrorResponse){
              let errorObj = JSON.parse(err.error);
              this.msgService.show("code Http: "+errorObj.description+ "description: "+errorObj.description, "error");        
            }
          }
        });
      } else {
        this.msgService.show("Votre vote est en cours de traitement", "info")
      }
    } else{
      if(!this.hasVoted){ //Possibilité de voter à la première visite du détail. Second vote possible uniquement après rafraichissement
        this.selectedScore = index + 1;
        this.previousSelection = this.selectedScore;
  
        //Conception du body de la requête
        this.userRating = {
          "previousRating": this.selectedUserSerie.userRating === 0 ? null : this.selectedUserSerie.userRating,
          "newRating": this.selectedScore,
          "userId": this.selectedUserSerie.user.id,
          "userMovieId": this.selectedUserSerie.id,
          "movieId": this.selectedUserSerie.serie.id
        };
  
        //Envoi du PUT pour MAJ de la note
        this.userSerieService.updateUserRating(this.userRating).subscribe( {
          next: (response:any) => {
            console.log("retour post updateRating",response);
            this.msgService.show("Votre vote a bien été pris en compte", "success");
            this.hasVoted = true;
          },
          error: (err:unknown) => {
            if (err instanceof HttpErrorResponse){
              let errorObj = JSON.parse(err.error);
              this.msgService.show("code Http: "+errorObj.description+ "description: "+errorObj.description, "error");        
            }
          }
        });
      } else {
        this.msgService.show("Votre vote est en cours de traitement", "info")
      }
    }
    
  }
}
