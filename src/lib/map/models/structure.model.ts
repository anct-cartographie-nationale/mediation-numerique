import { Equipment } from './enum/equipment.enum';
import { typeStructureEnum } from './enum/typeStructure.enum';
import { Weekday } from './enum/weekday.enum';
import { Address } from './address.model';
import { Day } from './day.model';
import { OpeningDay } from './openingDay.model';
import { Week } from './week.model';
import { PersonalOffer } from './personalOffer.model';

export class Structure {
  public _id: string = null;
  public numero: string = null;
  public createdAt: string = null;
  public updatedAt: string = null;
  public structureName: string = null;
  public structureType: string = null;
  public description: string = null;
  public address: Address = new Address();
  public contactPhone: string = null;
  public contactMail: string = null;
  public website: string = null;
  public facebook: string = null;
  public twitter: string = null;
  public instagram: string = null;
  public linkedin: string = null;
  public lockdownActivity: string = null;
  public pmrAccess: boolean = null;
  public placeOfReception: boolean = null;
  public choiceCompletion: boolean = null;
  public contactPersonFirstName: string = null;
  public contactPersonLastName: string = null;
  public contactPersonEmail: string = null;
  public publicsAccompaniment: string[] = [];
  public proceduresAccompaniment: string[] = [];
  public remoteAccompaniment: boolean = null;
  public accessModality: string[] = [];
  public labelsQualifications: string[] = [];
  public publics: string[] = [];
  public nbComputers: number = null;
  public nbPrinters: number = null;
  public nbTablets: number = null;
  public nbNumericTerminal: number = null;
  public nbScanners: number = null;
  public exceptionalClosures: string = null;
  public equipmentsAndServices: string[] = [];
  public hours: Week;
  public freeWorkShop: boolean = null;
  public otherDescription: string = null;

  public isOpen: boolean = false;
  public openedOn: OpeningDay = new OpeningDay();
  public baseSkills: string[] = [];
  public accessRight: string[] = [];
  public parentingHelp: string[] = [];
  public socialAndProfessional: string[] = [];
  public digitalCultureSecurity: string[] = [];

  public distance?: number;
  public coord?: number[] = [];
  public dataShareConsentDate?: string;

  public accountVerified: boolean = false;

  public personalOffers: PersonalOffer[] = [];

  public alreadySelected? = false;

  constructor(obj?: any) {
    Object.assign(this, obj, {
      hours: obj && obj.hours ? new Week(obj.hours) : new Week()
    });
  }

  public getDayhours(day: Weekday): Day {
    switch (day) {
      case Weekday.monday:
        return this.hours.monday;
      case Weekday.tuesday:
        return this.hours.tuesday;
      case Weekday.thursday:
        return this.hours.thursday;
      case Weekday.wednesday:
        return this.hours.wednesday;
      case Weekday.friday:
        return this.hours.friday;
      case Weekday.saturday:
        return this.hours.saturday;
      case Weekday.sunday:
        return this.hours.sunday;
      default:
        return null;
    }
  }

  /**
   * Check if a structure has equipments
   */
  public hasEquipments(): boolean {
    if (this.equipmentsAndServices.length && this.hasNotOnlyEmptyEquipments()) {
      return true;
    }
    return false;
  }

  /**
   * Verify that a structure as not only equipments with 0 as value. This is mostly use for display.
   * @returns {Boolean} validation
   */
  public hasNotOnlyEmptyEquipments(): boolean {
    if (this.nbComputers + this.nbPrinters + this.nbTablets + this.nbNumericTerminal + this.nbScanners > 0) return true;
    return false;
  }

  /**
   * Check if a structure has pass Numeric label
   */
  public hasPassNumeric(): boolean {
    return this.labelsQualifications.includes('passNumerique');
  }

  /**
   * Return a range, according to the distance, between [1,3] to get a distance reference.
   * - [0,5km] => 1
   * - [5km,10km] => 2
   * - [10km, [ => 3
   */
  public getDistanceRange(): number {
    if (!this.distance) {
      return 3;
    } else {
      // If it's in km
      if (this.distance > 10000) {
        return 3;
      } else if (this.distance < 5000) {
        // If it's between 0 and 500 m
        return 1;
      } else {
        return 2;
      }
    }
  }

  public getLat(): number {
    return this.coord[1];
  }

  public getLon(): number {
    return this.coord[0];
  }

  public getEquipmentsIcon(equipment: Equipment): string {
    switch (equipment) {
      case Equipment.wifi:
        return 'wifi';
      case Equipment.bornes:
        return 'borne';
      case Equipment.printer:
        return 'print';
      case Equipment.tablet:
        return 'tablet';
      case Equipment.computer:
        return 'computer';
      case Equipment.scanner:
        return 'scan';
      default:
        return null;
    }
  }

  public getEquipmentsTitle(equipment: Equipment): string {
    switch (equipment) {
      case Equipment.wifi:
        return 'Wifi en accès libre';
      case Equipment.bornes:
        return this.nbNumericTerminal > 1 ? 'Bornes numériques' : 'Borne numérique';
      case Equipment.printer:
        return this.nbPrinters > 1 ? 'Imprimantes' : 'Imprimante';
      case Equipment.tablet:
        return this.nbTablets > 1 ? 'Tablettes' : 'Tablette';
      case Equipment.computer:
        return this.nbComputers > 1 ? 'Ordinateurs' : 'Ordinateur';
      case Equipment.scanner:
        return this.nbScanners > 1 ? 'Scanners' : 'Scanner';
      default:
        return null;
    }
  }

  public getLabelTypeStructure(): string {
    return typeStructureEnum[this.structureType] ? typeStructureEnum[this.structureType] : '';
  }

  public hasSocialNetwork(): boolean {
    return (
      (this.facebook !== null && this.facebook !== '') ||
      (this.instagram !== null && this.instagram !== '') ||
      (this.linkedin !== null && this.linkedin !== '') ||
      (this.twitter !== null && this.twitter !== '')
    );
  }
}
