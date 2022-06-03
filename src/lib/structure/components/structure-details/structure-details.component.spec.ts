import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Structure } from '../../../map/models/structure.model';
import { Category } from '../../models/category.model';
import { Module } from '../../models/module.model';
import { SEARCH_TOKEN, STRUCTURE_TOKEN } from '../../repositories';
import { PrintService } from '../../services/print.service';
import { StructureDetailsComponent } from './structure-details.component';

describe('StructureDetailsComponent', () => {
  let component: StructureDetailsComponent;
  let fixture: ComponentFixture<StructureDetailsComponent>;
  let route: ActivatedRouteSnapshot;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StructureDetailsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: SEARCH_TOKEN,
          useValue: {
            getCategoriesAccompaniment: () => of([]),
            getCategoriesTraining: () => of([]),
            getCategoriesOthers: () => of([]),
          },
        },
        {
          provide: STRUCTURE_TOKEN,
          useValue: {},
        },
      ],
    })
      .overrideProvider(PrintService, { useValue: {} })
      .compileComponents();
    route = new ActivatedRouteSnapshot();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureDetailsComponent);
    component = fixture.componentInstance;
    let structure: Structure = new Structure();
    structure.baseSkills = ['123', '234', '817'];
    component.printMode = true;
    component.structure = structure;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update array with right modules', () => {
    route.queryParams = {
      id: 'sup3er1d',
    };

    let baseSkillssReferentiel = new Category();
    let accessRightsReferentiel = new Category();
    const mo1 = new Module('132', 'Uniquement sur RDV');
    const mo2 = new Module('145', 'Accès libre');
    const mo3 = new Module('112', 'Téléphone / Visio');
    const arrayModule: Module[] = [mo1, mo2, mo3];
    const m1 = new Module('260', 'm1');
    const m2 = new Module('259', 'm2');
    const m3 = new Module('261', 'm3');
    const m4 = new Module('249', 'm4');
    const m5 = new Module('222', 'm5');
    const arrayModuleBase: Module[] = [m1, m2, m3, m4, m5];
    baseSkillssReferentiel.name = 'categ2';
    baseSkillssReferentiel.modules = arrayModuleBase;
    component.baseSkillssReferentiel = baseSkillssReferentiel;
    accessRightsReferentiel.name = 'categ1';
    accessRightsReferentiel.modules = arrayModule;
    component.accessRightsReferentiel = accessRightsReferentiel;
    component.structure.baseSkills = ['260', '261'];
    component.structure.accessRight = ['145', '112'];
    component.setServiceCategories();
    expect(component.baseSkills).toEqual([m1, m3]);
    expect(component.accessRights).toEqual([mo2, mo3]);
  });
});
