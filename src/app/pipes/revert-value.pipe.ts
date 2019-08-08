import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'revertValue'
})
export class RevertValuePipe implements PipeTransform {

  transform(value: boolean): any {
    if (value) {
      return '+';
    } else {
      return '-';
    }
  }

}
