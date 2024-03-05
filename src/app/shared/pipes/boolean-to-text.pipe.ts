import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanToText',
  standalone: true
})
export class BooleanToTextPipe implements PipeTransform {

  transform(value: boolean): string {
    if(!value) return '';
    return value ? 'Yes' : 'No';
  }

}
