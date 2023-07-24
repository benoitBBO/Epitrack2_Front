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
  newStatus!:string;
  //@Output() statusEvent = new EventEmitter();
  checked = false;
  //confirmed = false;
  //obj!:any;

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
    console.log(this.checked)
    //appel update status usermovie ou userserie
    if (this.checked) {
      if (!confirm('Vous confirmez avoir vu toutes les saisons?')) {
        this.checked = !this.checked;
      }
    } else {
      if (!confirm('Vous confirmez passer toutes les saisons à Non Vu?')) {
        this.checked = !this.checked;
      }
    }

    this.status = "UNWATCHED";
    if (this.checked) {
      this.status = "WATCHED"
    }
    switch (this.videoType) {
      case 'MOVIE': 
        //this.userMovieService.changeStatusUserMovie(this.userVideoId, this.status);
        this.userMovieService.changeStatusUserMovie(this.userVideoId, this.newStatus);
        break;
      case 'SERIE':
        // message de confirmation car va mettre à jour aussi le statut de tous les saisons / épisodes
        //let msg = "Le changement de statut de la série va mettre à jour le statut de toutes les saisons et épisodes.\nVoulez-vous continuer ?";
        //this.messageService.openConfirmDialog(msg);
        //if(this.confirmed){
          // appel service changeStatusUserService seulement si confirmation OUI
          console.log("change status serie)");
          //------ version avec @Output statusEvent
          //--------pour appel update back dans le parent user-serie-list
          //this.statusEvent.emit({userVideoId: this.userVideoId, status:this.newStatus});
          //------ version avec appel update back ici dans enfant toggle
          //this.userSerieService.changeStatusUserSerie(this.userVideoId, this.newStatus)
            //.subscribe({
            //   next: (response:any) => {
            //     console.log("next");
            //     this.messageService.show("statut mis à jour", "success");
            //     this.statusEvent.emit({userVideoId: this.userVideoId, status:this.newStatus})
            //     //this.router.navigate(['/user/series']);
            //   } ,
            //   error: (err:unknown) => {
            //     if (err instanceof HttpErrorResponse){
            //       console.log("error avant message");
            //       this.newStatus = this.status;
            //       this.statusEvent.emit({userVideoId: this.userVideoId, status:this.newStatus})
            //       this.messageService.show("erreur de mise à jour du statut", "error");
            //       console.log("error après message");
            //       this.router.navigate(['/user/series']);
            //     }
            //   },
            //   complete: () => {
            //     console.log("complete");
            //     this.router.navigate(['/user/series']);
            //   }         
            // })
          
        //}else{
        //  console.log("pas de changement statut en base");
          //il manque le toggle qui a bougé, le faire revenir en arrière
        //}
        
        break;
      default:
        this.messageService.show("Erreur type de video inconnu", "error");
    }
  }

  //changed2(obj:any){
    //console.log(this.checked)
    //console.log("obj: ", obj);
    //this.checked=false;
    //appel update status usermovie ou userserie
    // this.status = "UNWATCHED";
    // if (this.checked) {
    //   this.status = "WATCHED"
    // }
    // switch (this.videoType) {
    //   case 'MOVIE': 
    //     this.userMovieService.changeStatusUserMovie(this.userVideoId, this.status);
    //     break;
    //   case 'SERIE':
    //     // message de confirmation car va mettre à jour aussi le statut de tous les saisons / épisodes
    //     let msg = "Le changement de statut de la série va mettre à jour le statut de toutes les saisons et épisodes.\nVoulez-vous continuer ?";
    //     let confirmChose:boolean = this.messageService.confirm(msg, this.confirmed);
    //     if(confirmChose == false){
    //       this.checked=!this.checked;
    //     }

    //     // appel service changeStatusUserService seulement si confirmation OUI
    //     this.userSerieService.changeStatusUserSerie(this.userVideoId, this.status);
    //     console.log("change status serie)");
    //     break;
    //   default:
    //     this.messageService.show("Erreur type de video inconnu", "error");
    // }
    //}
  

  // saveConfirm(event:Event){
  //   if(event){
  //     this.confirmed=true;
  //   }else{
  //     this.confirmed=false;
  //   }
  //   console.log("saveConfirm: ", this.confirmed);
  // }
}
