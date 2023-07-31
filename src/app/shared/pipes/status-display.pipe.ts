import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusDisplay'
})
export class StatusDisplayPipe implements PipeTransform {

  transform(value: string): string {
    let statusToDisplay:string ="";
    switch (value){
      case 'WATCHED':
        statusToDisplay = "Déjà vu";
        break;
      case 'UNWATCHED':
        statusToDisplay = "A voir";
        break;
      case 'ONGOING':
        statusToDisplay = "En cours";
        break;
      default:
        statusToDisplay = "inconnu";
    }
    return statusToDisplay;
  }

}
