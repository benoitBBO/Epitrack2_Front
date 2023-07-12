import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'printImg'
})
export class PrintImgPipe implements PipeTransform {

  transform(value: string): string {
    return 'https://image.tmdb.org/t/p/w500/'+value;
  }

}
