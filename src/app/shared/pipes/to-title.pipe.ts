import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toTitle',
  standalone: true
})
export class ToTitlePipe implements PipeTransform {

  transform(value: string): string {
    if(!value) return '';
    return value.replace(/([-_][a-z])/ig, ($1) => {
      return $1.replace('-', ' ')
          .replace('_', ' ');
  }).replace(/[A-Z]/g, letter => `${letter.toLowerCase()}`);
  }

}
