import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creatingName'
})
export class CreatingNamePipe implements PipeTransform {

  letter: string;
  transform(value: string): string {
    if (!typeof (value.substr(0, 1) === 'String')) {
      return;
    }
    this.letter = value.substring(0, 1).toUpperCase();
    //this.lengthOfWord = value.length;
    return this.letter;
  }

}
