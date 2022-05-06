import { Day } from './day.model';

export class Week {
  monday: Day;
  tuesday: Day;
  wednesday: Day;
  thursday: Day;
  friday: Day;
  saturday: Day;
  sunday: Day;

  constructor(obj?: any) {
    Object.assign(this, obj, {
      monday: obj && obj.monday ? new Day(obj.monday) : new Day(),
      tuesday: obj && obj.tuesday ? new Day(obj.tuesday) : new Day(),
      wednesday: obj && obj.wednesday ? new Day(obj.wednesday) : new Day(),
      thursday: obj && obj.thursday ? new Day(obj.thursday) : new Day(),
      friday: obj && obj.friday ? new Day(obj.friday) : new Day(),
      saturday: obj && obj.saturday ? new Day(obj.saturday) : new Day(),
      sunday: obj && obj.sunday ? new Day(obj.sunday) : new Day()
    });
  }

  public getDayTranslation(day: string): string {
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

  public hasData() {
    if (
      this.monday.time.length === 0 &&
      this.tuesday.time.length === 0 &&
      this.wednesday.time.length === 0 &&
      this.thursday.time.length === 0 &&
      this.friday.time.length === 0 &&
      this.saturday.time.length === 0 &&
      this.sunday.time.length === 0
    ) {
      return false;
    }
    return true;
  }
}
