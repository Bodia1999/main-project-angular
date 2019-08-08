import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'revertTime'
})
export class RevertTimePipe implements PipeTransform {

  updatedValue: string;
  transform(value: string): any {
    this.updatedValue = value.split('T')[0];
    return this.updatedValue;
  }

}
