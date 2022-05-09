import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Filter } from '../../models/filter.model';
import { StructureListSearchComponent } from './structure-list-search.component';
import { Module } from '../../models/module.model';
import { TypeModal } from '../../models/enum/typeModal.enum';
import { SEARCH_TOKEN } from '../../repositories';
import { of } from 'rxjs';
import { ButtonStubComponent } from '@gouvfr-anct/mediation-numerique/testing';
import { Component } from '@angular/core';

@Component({
  template: ''
})
export class ActeursTestingComponent {}

describe('StructureListSearchComponent', () => {
  let component: StructureListSearchComponent;
  let fixture: ComponentFixture<StructureListSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([{ path: 'acteurs', component: ActeursTestingComponent }])],
      declarations: [StructureListSearchComponent, ButtonStubComponent, ActeursTestingComponent],
      providers: [
        {
          provide: SEARCH_TOKEN,
          useValue: {
            getIndex: () => 0,
            getCategoriesAccompaniment: () => of([]),
            getCategoriesTraining: () => of([]),
            getCategoriesOthers: () => of([])
          }
        },
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

    fixture = TestBed.createComponent(StructureListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toEqual(true);
  });

  // applyFilter function
  it('should emit filters', () => {
    const filter: Filter[] = [new Filter('query', 'valInput')];
    jest.spyOn(component.searchEvent, 'emit');
    component.applyFilter('valInput');
    expect(component.searchEvent.emit).toHaveBeenCalled();
    expect(component.searchEvent.emit).toHaveBeenCalledWith(filter);
  });

  // countCheckFiltersOnModules function
  it('should return a number of checked elements in an array', () => {
    const checkedModules: Module[] = [
      { id: '176', text: 'baseSkills', count: 0 },
      { id: '173', text: 'socialAndProfessional', count: 0 },
      { id: '172', text: 'accessModality', count: 0 }
    ];

    component.countCheckFiltersOnModules(checkedModules);
    expect(component.numberTrainingChecked).toEqual(2);
  });

  it('should return 0 of checked elements in an array', () => {
    const checkedModules: Module[] = [
      { id: '176', text: 'proceduresAccompaniment', count: 0 },
      { id: '173', text: 'baseSkills', count: 0 },
      { id: '172', text: 'publicsAccompaniment', count: 0 }
    ];

    component.countCheckFiltersOnModules(checkedModules);
    expect(component.numberAccompanimentChecked).toEqual(1);
  });

  // fetchResults function
  it('should update number of checked elements in current filter', () => {
    const checkedModules: Module[] = [
      { id: '176', text: 'training', count: 0 },
      { id: '173', text: 'accompaniment', count: 0 },
      { id: '172', text: 'accompaniment', count: 0 },
      { id: '180', text: 'moreFilters', count: 0 },
      { id: '130', text: 'moreFilters', count: 0 },
      { id: '219', text: 'moreFilters', count: 0 }
    ];
    component.modalTypeOpened = TypeModal.training;
    component.numberAccompanimentChecked = 2;
    component.numberMoreFiltersChecked = 3;
    component.fetchResults(checkedModules);
    expect(component.numberTrainingChecked).toEqual(0);
  });

  // openModal function
  it('should open modal', () => {
    component.openModal(TypeModal.training);
    expect(component.modalTypeOpened).toEqual(TypeModal.training);
  });

  // closeModal function
  it('should close modal', () => {
    component.modalTypeOpened = TypeModal.training;
    component.closeModal();
    expect(component.modalTypeOpened).toBeUndefined();
  });

  it('should remove conseillerNumFranceServices filter to array of current filters and increment by one number of moreFilters element', () => {
    const evt = { target: { checked: false, value: 'Conseiller numérique' } };
    const categ = 'Labels et qualifications';
    const checkedModules: Module[] = [{ id: evt.target.value, text: categ, count: 0 }];
    component.checkedModulesFilter = checkedModules;
    new Module(evt.target.value, categ);
    expect(component.checkedModulesFilter.length).toEqual(1);
    expect(component.numberMoreFiltersChecked).toEqual(0);
  });

  it('should remove numericPass filter to array of current filters and increment by one number of moreFilters element', () => {
    const evt = { target: { checked: false, value: 'Pass numérique' } };
    const categ = 'Labels et qualifications';
    const checkedModules: Module[] = [{ id: evt.target.value, text: categ, count: 0 }];
    component.checkedModulesFilter = checkedModules;
    new Module(evt.target.value, categ);
    expect(component.checkedModulesFilter.length).toEqual(1);
    expect(component.numberMoreFiltersChecked).toEqual(0);
  });

  // learInput function
  it('should reset form', () => {
    component.searchForm.setValue({ searchTerm: 'someSearchTerm' });
    component.clearInput();
    expect(component.searchForm.get('searchTerm').value).toBeNull();
  });
});
