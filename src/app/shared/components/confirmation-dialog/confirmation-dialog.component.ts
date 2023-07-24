import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { createInjectableType } from '@angular/compiler';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {

  @Output() confirmation = new EventEmitter<boolean>();
  

  //constructor(public dialog:MatDialog){}
  constructor()  {}

  onConfirmNo(){
    this.confirmation.emit(false);
  }

  onConfirmYes(){
    this.confirmation.emit(true);
  }


}
