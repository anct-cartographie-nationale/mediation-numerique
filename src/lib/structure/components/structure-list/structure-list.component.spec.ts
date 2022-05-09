import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StructureListComponent } from './structure-list.component';
import { Structure } from '../../../map/models/structure.model';
import { OpeningDay } from '../../../map/models/openingDay.model';
import { STRUCTURE_TOKEN } from '../../repositories/structure.repository';
import { of } from 'rxjs';
import { CardStubComponent } from '@gouvfr-anct/mediation-numerique/testing';

describe('StructureListComponent', () => {
  let component: StructureListComponent;
  let fixture: ComponentFixture<StructureListComponent>;
  let structure: Structure;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StructureListComponent, CardStubComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of([])
          }
        },
        {
          provide: STRUCTURE_TOKEN,
          useValue: {}
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureListComponent);
    component = fixture.debugElement.componentInstance;
    structure = new Structure({
      id: 1,
      numero: '26-63',
      updatedAt: '2020-10-08T15:17:00.000Z',
      nomDeLusager: 'Erwan Le luron',
      structureRepresentation: 'Un établissement principal (siège social)',
      structureName: 'Régie de Quartier Armstrong',
      structureType: 'Tiers-lieu & coworking, FabLab',
      description: "Association loi 1901 dont l'objet est l'insertion par l'économie social et solidaire",
      n: 2,
      adressWay: 21356,
      contactPhone: '04 72 21 03 07',
      contactMail: 'sguillet@rqa.fr',
      website: '',
      facebook: '',
      twitter: '@rqainfo69',
      instagram: '',
      gender: 'Madame',
      contactName: 'GUILLET',
      contactSurname: 'Séverine',
      fonction: 'Autres',
      pmrAccess: '',
      choixMultiples: 'Tout public',
      exceptionalClosures: '',
      proceduresAccompaniment: 'Accompagnant CAF',
      autresAccompagnements: '',
      baseSkills: 260,
      accessRight: 176,
      socialAndProfessional: 254,
      parentingHelp: '',
      digitalCultureSecurity: 264,
      wifiEnAccesLibre: 'True',
      nbComputers: '',
      nombre: '',
      tablettes: '',
      bornesNumeriques: '',
      imprimantes: '',
      autresEspacesProposesParLaStructure: 'Espace libre service',
      appartenezVousAUnReseauDeMediation: '',
      precisezLequel: '',
      idDeLitemStructureDansDirectus: 123,
      statutDeLitemStructureDansDirectus: '',
      idDeLitemOffreDansDirectus: '',
      statut: 'Erreur lors du versement des données offre',
      hours: {
        monday: {
          open: true,
          time: [
            {
              opening: 1330,
              closing: 1630
            },
            {
              opening: null,
              closing: null
            }
          ]
        },
        tuesday: {
          open: true,
          time: [
            {
              opening: 830,
              closing: 1130
            },
            {
              opening: 1330,
              closing: 1630
            }
          ]
        },
        wednesday: {
          open: true,
          time: [
            {
              opening: 1330,
              closing: 1630
            },
            {
              opening: null,
              closing: null
            }
          ]
        },
        thursday: {
          open: true,
          time: [
            {
              opening: 830,
              closing: 1130
            },
            {
              opening: 1330,
              closing: 1630
            }
          ]
        },
        friday: {
          open: true,
          time: [
            {
              opening: 830,
              closing: 1130
            },
            {
              opening: 1330,
              closing: 1530
            }
          ]
        },
        saturday: {
          open: false,
          time: [
            {
              opening: null,
              closing: null
            },
            {
              opening: null,
              closing: null
            }
          ]
        },
        sunday: {
          open: false,
          time: [
            {
              opening: null,
              closing: null
            },
            {
              opening: null,
              closing: null
            }
          ]
        }
      },
      openedOn: new OpeningDay('monday', null)
    });
    const structureList = new Array<Structure>(structure);
    structureList.length = 4;
    component.structureList = structureList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit id structure and update variables to open details', () => {
    jest.spyOn(component.selectedMarkerId, 'emit');
    component.showDetails(structure);
    expect(component.selectedMarkerId.emit).toHaveBeenCalled();
    expect(component.selectedMarkerId.emit).toHaveBeenCalledWith(structure._id);
    expect(component.showStructureDetails).toBe(true);
    expect(component.structure).toBe(structure);
  });

  it('should emit id structure and update variables to close details', () => {
    jest.spyOn(component.selectedMarkerId, 'emit');
    component.closeDetails();
    expect(component.selectedMarkerId.emit).toHaveBeenCalled();
    expect(component.selectedMarkerId.emit).toHaveBeenCalledWith();
    expect(component.showStructureDetails).toBe(false);
  });

  it('should emit id structure to display map marker', () => {
    jest.spyOn(component.displayMapMarkerId, 'emit');
    component.handleCardHover(structure);
    expect(component.displayMapMarkerId.emit).toHaveBeenCalled();
    expect(component.displayMapMarkerId.emit).toHaveBeenCalledWith(structure._id);
  });

  it('should emit undefined id structure to remove map marker', () => {
    jest.spyOn(component.displayMapMarkerId, 'emit');
    component.mouseLeave();
    expect(component.displayMapMarkerId.emit).toHaveBeenCalled();
    expect(component.displayMapMarkerId.emit).toHaveBeenCalledWith(undefined);
  });
});
