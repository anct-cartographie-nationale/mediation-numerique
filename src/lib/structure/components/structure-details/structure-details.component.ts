import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Equipment } from '../../../map/models/enum/equipment.enum';
import { Structure } from '../../../map/models/structure.model';
import { Category } from '../../models/category.model';
import { AccessModality } from '../../models/enum/access-modality.enum';
import { PublicCategorie } from '../../models/enum/public.enum';
import { Module } from '../../models/module.model';
import { SearchRepository, SEARCH_TOKEN } from '../../repositories/search.repository';
import { StructureRepository, STRUCTURE_TOKEN } from '../../repositories/structure.repository';
import { PrintService } from '../../services/print.service';

@Component({
  selector: 'app-structure-details',
  templateUrl: './structure-details.component.html',
  styleUrls: ['./structure-details.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [style({ left: '-600px' }), animate('200ms ease-in', style({ left: '0' }))]),
      transition(':leave', [animate('200ms ease-in', style({ left: '-600px' }))]),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ backgroundColor: 'rgb(00, 00, 00, 0)' }),
        animate('200ms ease-in', style({ backgroundColor: 'rgb(00, 00, 00, 0.6)' })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ backgroundColor: 'rgb(00, 00, 00, 0)' }))]),
    ]),
    trigger('show', [
      state('true', style({ height: AUTO_STYLE, visibility: AUTO_STYLE, margin: '8px 0' })),
      state('false', style({ height: '0px', visibility: 'hidden', margin: '0' })),
      transition('true => false', animate('300ms ease-out')),
      transition('false => true', animate('300ms ease-out')),
    ]),
  ],
  providers: [PrintService],
})
export class StructureDetailsComponent implements OnInit {
  @Input() public structure: Structure;
  @Output() public closeDetails: EventEmitter<boolean> = new EventEmitter<boolean>();
  public accessModality = AccessModality;

  public baseSkillssReferentiel: Category;
  public accessRightsReferentiel: Category;
  public digitalCultureSecuritysReferentiel: Category;
  public socialAndProfessionalsReferentiel: Category;
  public parentingHelpsReferentiel: Category;
  public baseSkills: Module[];
  public accessRights: Module[];
  public parentingHelp: Module[];
  public socialAndProfessional: Module[];
  public digitalCultureSecurity: Module[];
  public showBaseSkills = false;
  public showAccessRights = false;
  public showParentingHelp = false;
  public showSocialAndProfessional = false;
  public showDigitalSecurity = false;
  public printMode = false;
  public isLoading = true;
  public lockdownInfoDisplay = false;
  public structureErrorModalOpenned = false;
  public fullScreen = false;

  constructor(
    @Inject(SEARCH_TOKEN) readonly searchService: SearchRepository,
    @Inject(STRUCTURE_TOKEN) readonly structureService: StructureRepository,
    private readonly printService: PrintService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.url.subscribe((url) => {
      if (url[0]?.path === 'structure') {
        this.structure = new Structure(this.printService.structure);
        this.printMode = true;
        // Display formations for printing
        this.toggleAccessRights();
        this.toggleBaseSkills();
        this.toggleDigitalSecurity();
        this.toggleParentingHelp();
        this.toggleSocialAndProfessional();
        this.initForm();
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams.id) {
        this.initForm();
      } else if (!this.printMode) {
        this.structure = null;
      }
    });
    this.route.data.subscribe((data) => {
      if (data.fullScreen) {
        this.fullScreen = true;
      }
    });
  }
  private async initForm(): Promise<void> {
    this.searchService.getCategoriesTraining().subscribe((referentiels) => {
      referentiels.forEach((referentiel) => {
        if (referentiel.isBaseSkills()) {
          this.baseSkillssReferentiel = referentiel;
        } else if (referentiel.isRigthtsAccess()) {
          this.accessRightsReferentiel = referentiel;
        } else if (referentiel.isDigitalCultureSecurity()) {
          this.digitalCultureSecuritysReferentiel = referentiel;
        } else if (referentiel.isParentingHelp()) {
          this.parentingHelpsReferentiel = referentiel;
        } else if (referentiel.isSocialAndProfessional()) {
          this.socialAndProfessionalsReferentiel = referentiel;
        }
      });
      this.setServiceCategories();
      if (this.printMode) {
        this.printService.onDataReady();
      }
      this.isLoading = false;
    });
    const index = this.structure.proceduresAccompaniment.indexOf('autres');
    if (index > -1) {
      this.structure.proceduresAccompaniment.splice(index, 1);
    }
  }

  public getEquipmentsLabel(equipment: Equipment): string {
    switch (equipment) {
      case Equipment.wifi:
        return 'Wifi en accès libre';
      case Equipment.bornes:
        return this.structure.nbNumericTerminal > 1 ? 'Bornes numériques' : 'Borne numérique';
      case Equipment.printer:
        return this.structure.nbPrinters > 1 ? 'Imprimantes' : 'Imprimante';
      case Equipment.tablet:
        return this.structure.nbTablets > 1 ? 'Tablettes' : 'Tablette';
      case Equipment.computer:
        return this.structure.nbComputers > 1 ? 'Ordinateurs' : 'Ordinateur';
      case Equipment.scanner:
        return this.structure.nbScanners > 1 ? 'Scanners' : 'Scanner';
      default:
        return null;
    }
  }

  public close(): void {
    this.route.url.subscribe((urls) => {
      if (urls.length > 0 && urls[0].path !== 'orientation') {
        this.router.navigate(['/acteurs'], {
          relativeTo: this.route,
          queryParams: {
            id: null,
          },
          queryParamsHandling: 'merge',
        });
      } else {
        this.isLoading = true;
        this.router.navigate(['./'], {
          relativeTo: this.route,
          queryParams: {
            id: null,
          },
          queryParamsHandling: 'merge',
        });
      }
    });
  }

  public print(): void {
    this.printService.printDocument('structure', this.structure);
  }

  public getAccessLabel(accessModality: AccessModality): string {
    switch (accessModality) {
      case AccessModality.free:
        return 'Accès libre';
      case AccessModality.meeting:
        return 'Sur rendez-vous';
      case AccessModality.meetingOnly:
        return 'Uniquement sur RDV';
      case AccessModality.numeric:
        return 'Téléphone / Visio';
      default:
        return null;
    }
  }

  public getPublicLabel(tagetPublic: PublicCategorie): string {
    switch (tagetPublic) {
      case PublicCategorie.young:
        return 'Jeunes (16 - 25 ans)';
      case PublicCategorie.adult:
        return 'Adultes';
      case PublicCategorie.elderly:
        return 'Séniors (+ de 65 ans)';
      case PublicCategorie.all:
        return 'Tout public';
      case PublicCategorie.under16Years:
        return 'Moins de 16 ans';
      case PublicCategorie.women:
        return 'Uniquement femmes';
      default:
        return null;
    }
  }

  public setServiceCategories(): void {
    this.baseSkills = this.structure.baseSkills.map((skill) =>
      _.find(this.baseSkillssReferentiel.modules, { id: skill })
    );
    this.accessRights = this.structure.accessRight.map((rights) =>
      _.find(this.accessRightsReferentiel.modules, { id: rights })
    );
    this.parentingHelp = this.structure.parentingHelp.map((help) =>
      _.find(this.parentingHelpsReferentiel.modules, { id: help })
    );
    this.socialAndProfessional = this.structure.socialAndProfessional.map((skill) =>
      _.find(this.socialAndProfessionalsReferentiel.modules, { id: skill })
    );
    this.digitalCultureSecurity = this.structure.digitalCultureSecurity.map((skill) =>
      _.find(this.digitalCultureSecuritysReferentiel.modules, { id: skill })
    );
  }

  public keepOriginalOrder = (a, b) => a.key;

  public isBaseSkills(): boolean {
    return this.baseSkills && this.baseSkills[0] !== undefined;
  }
  public isAccessRights(): boolean {
    return this.accessRights && this.accessRights[0] !== undefined;
  }
  public isParentingHelp(): boolean {
    return this.parentingHelp && this.parentingHelp[0] !== undefined;
  }
  public isSocialAndProfessional(): boolean {
    return this.socialAndProfessional && this.socialAndProfessional[0] !== undefined;
  }
  public isDigitalSecurity(): boolean {
    return this.digitalCultureSecurity && this.digitalCultureSecurity[0] !== undefined;
  }

  public filterOnlyEquipments(equipmentsAndServices: string[]): string[] {
    return equipmentsAndServices.filter((eqpt) =>
      ['ordinateurs', 'tablettes', 'bornesNumeriques', 'imprimantes', 'scanners', 'wifiEnAccesLibre'].includes(eqpt)
    );
  }

  public displayModalError(): void {
    this.structureErrorModalOpenned = !this.structureErrorModalOpenned;
  }

  public sendErrorEmail(modalValue: any): void {
    this.displayModalError();
    if (modalValue.shouldSend) {
      this.structureService.sendMailOnStructureError(this.structure._id, modalValue.content).subscribe(() => {});
    }
  }

  public multipleWorkshop(): boolean {
    if (
      this.structure.baseSkills.length +
        this.structure.accessRight.length +
        this.structure.parentingHelp.length +
        this.structure.socialAndProfessional.length +
        this.structure.digitalCultureSecurity.length >
      1
    ) {
      return true;
    }
    return false;
  }

  public toggleBaseSkills(): void {
    this.showBaseSkills = !this.showBaseSkills;
  }
  public toggleAccessRights(): void {
    this.showAccessRights = !this.showAccessRights;
  }
  public toggleParentingHelp(): void {
    this.showParentingHelp = !this.showParentingHelp;
  }
  public toggleSocialAndProfessional(): void {
    this.showSocialAndProfessional = !this.showSocialAndProfessional;
  }
  public toggleDigitalSecurity(): void {
    this.showDigitalSecurity = !this.showDigitalSecurity;
  }

  public goToWebsite(): void {
    window.open(this.structure.website, '_blank');
  }
}
