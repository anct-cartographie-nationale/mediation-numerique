import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'distance' })
export class DistancePipe implements PipeTransform {
  transform(distance: number): string {
    return distance > 1000 ? (distance / 1000).toFixed(1).toString() + ' km' : distance.toFixed(0) + ' m';
  }
}
