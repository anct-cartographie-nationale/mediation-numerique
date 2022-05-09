import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {
  transform(value: string): string {
    //Remove dot and space from the phone string and add space in each 2 numbers
    const regexArray = value.replace(/\s|\./g, '').match(/.{1,2}/g);
    return regexArray.join(' ');
  }
}
