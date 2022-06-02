import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { HttpClientModule } from '@angular/common/http';
import { Structure } from '../../../map/models/structure.model';
import { OpeningDay } from '../../../map/models/openingDay.model';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let structure: Structure;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [CardComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: 123 },
              queryParamMap: new Map([['search', 'term']])
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.debugElement.componentInstance;
    structure = new Structure({
      id: 1,
      numero: '26-63',
      updatedAt: '2020-10-08T15:17:00.000Z',
      structureRepresentation: 'Un établissement principal (siège social)',
      structureName: 'Régie de Quartier Armstrong',
      structureType: 'Tiers-lieu & coworking, FabLab',
      description: "Association loi 1901 dont l'objet est l'insertion par l'économie social et solidaire",
      address: {
        numero: 2,
        street: 'rue du test',
        commune: 'villeurbanne'
      },

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
      publicsAccompaniment: 'Tout public',
      exceptionalClosures: '',
      proceduresAccompaniment: 'Accompagnant CAF',
      autresAccompagnements: '',
      baseSkills: 260,
      accessRight: 176,
      socialAndProfessional: 254,
      parentingHelp: '',
      digitalCultureSecurity: 264,
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
        },
        openedOn: new OpeningDay('monday', null)
      },
      openedOn: new OpeningDay('monday', null)
    });
    component.structure = structure;
    fixture.detectChanges(); // calls NgOnit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit structure to show details', () => {
    jest.spyOn(component.showDetails, 'emit');
    component.cardClicked();
    expect(component.showDetails.emit).toHaveBeenCalled();
    expect(component.showDetails.emit).toHaveBeenCalledWith(structure);
  });

  it('should emit structure on cardHover', () => {
    jest.spyOn(component.hover, 'emit');
    component.cardHover();
    expect(component.hover.emit).toHaveBeenCalled();
    expect(component.hover.emit).toHaveBeenCalledWith(structure);
  });
});
