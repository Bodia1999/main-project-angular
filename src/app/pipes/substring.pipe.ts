import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substring'
})
export class SubstringPipe implements PipeTransform {

  transform(value: string): any {
    if (value.length >= 200) {
      value = value.substring(0,199);
    }
    return value + '...';
  }

}
