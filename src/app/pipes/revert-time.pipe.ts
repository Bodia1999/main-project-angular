import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'revertTime'
})
export class RevertTimePipe implements PipeTransform {

  updatedValue: string;
  time: string;
  transform(value: string): any {

    if (value === null) {
      return;
    }
    if (value.indexOf('.') === 19) {
      this.time = value.substring(value.indexOf('T') + 1, value.indexOf('.'));
    } else {
      this.time = value.substring(value.indexOf('T') + 1, 25);
    }
    this.updatedValue = value.split('T')[0];

    return this.updatedValue.concat(' ').concat(this.time);
  }

}
