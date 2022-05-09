import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'day', pure: false })
export class DayPipe implements PipeTransform {
  transform(day: string): any {
    switch (day) {
      case 'monday':
        return 'lundi';
      case 'tuesday':
        return 'mardi';
      case 'thursday':
        return 'jeudi';
      case 'wednesday':
        return 'mercredi';
      case 'friday':
        return 'vendredi';
      case 'saturday':
        return 'samedi';
      case 'sunday':
        return 'dimanche';
      default:
        return null;
    }
  }
}
