export class OpeningDay {
  day: string = null;
  schedule: string = null;

  constructor(day?: string, schedule?: string) {
    this.day = day;
    this.schedule = schedule;
  }
}
