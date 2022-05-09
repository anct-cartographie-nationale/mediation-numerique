import { Time } from './time.model';

export class Day {
  open: boolean = false;
  time: Time[];

  constructor(obj?: any) {
    Object.assign(this, obj, {
      time: obj && obj.time ? obj.time.map((time) => new Time(time)) : []
    });
  }
}
