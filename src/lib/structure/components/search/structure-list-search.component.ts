import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonType } from '@gouvfr-anct/mediation-numerique/shared';
import { TypeModal } from '../../models/enum/typeModal.enum';
import { Category } from '../../models/category.model';
import { Filter } from '../../models/filter.model';
import { Module } from '../../models/module.model';
import { SEARCH_TOKEN, SearchRepository } from '../../repositories/search.repository';

@Component({
  selector: 'app-structure-list-search',
  templateUrl: './structure-list-search.component.html',
  styleUrls: ['./structure-list-search.component.scss']
})
export class StructureListSearchComponent implements OnInit {
  @Output() searchEvent = new EventEmitter();
  public locate = false;
  // Show/hide form createStructure
  public addStructureFormModal = false;
  public buttonTypeEnum = ButtonType;

  // Form search input
  public searchForm: FormGroup;
  public modalTypeOpened: TypeModal;
  // Checkbox variable
  public checkedModulesFilter: Module[];

  public numberTrainingChecked = 0;
  public numberAccompanimentChecked = 0;
  public numberPublicChecked = 0;
  public numberEquipmentChecked = 0;
  public numberMoreFiltersChecked = 0;

  // Modal categories
  public categoriesTraining: Category[] = [];
  public categoriesAccompaniment: Category[] = [];
  public categoriesPublic: Category[] = [];
  public categoriesEquipment: Category[] = [];
  public categoriesMoreFilters: Category[] = [];

  public queryString: string;
  // Modal confirmation variable
  public isConfirmationModalOpen = false;
  public confirmationModalContent =
    'Afin d’ajouter votre structure,vous allez être redirigé vers le formulaire Grand Lyon à remplir.';

  constructor(
    @Inject(SEARCH_TOKEN) readonly searchService: SearchRepository,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      searchTerm: this.activatedRoute.snapshot.queryParamMap.get('search')
        ? this.activatedRoute.snapshot.queryParamMap.get('search')
        : ''
    });
  }
  ngOnInit(): void {
    // Will store the different categories
    this.getData();
    this.queryString = this.activatedRoute.snapshot.queryParamMap.get('search');
    this.checkedModulesFilter = new Array();
    if (this.queryString) {
      const filters: Filter[] = [];
      filters.push(new Filter('query', this.queryString));
      this.searchEvent.emit(filters);
    }
  }

  public convertModulesTofilters(modules: Module[], term?: string): Filter[] {
    const filters: Filter[] = [];
    if (term) {
      filters.push(new Filter('query', term));
    }
    // Add checked box filter
    modules.forEach((cm) => {
      filters.push(new Filter(cm.text, cm.id, cm.displayText));
    });
    return filters;
  }

  // Accessor to template angular.
  public get TypeModal(): typeof TypeModal {
    return TypeModal;
  }

  // Clear input search
  public clearInput(): void {
    this.searchForm.reset();
    this.applyFilter(null);
  }

  // Sends an array containing all filters
  public applyFilter(term: string): void {
    // Add search input filter
    if (term) {
      this.router.navigate(['/acteurs'], {
        relativeTo: this.route,
        queryParams: {
          search: term
        },
        queryParamsHandling: 'merge'
      });
    } else if (!term) {
      this.router.navigate(['/acteurs'], {
        relativeTo: this.route
      });
    }
    const filters = this.convertModulesTofilters(this.checkedModulesFilter, term);
    // Send filters
    this.searchEvent.emit(filters);
  }

  public fetchResults(checkedModules: Module[]): void {
    const inputTerm = this.searchForm.get('searchTerm').value;
    // Check if some modules is checked in filters
    if (this.checkedModulesFilter !== checkedModules) {
      this.countCheckFiltersOnModules(checkedModules);
    }
    // Store checked modules
    this.checkedModulesFilter = checkedModules;
    // Close modal after receive filters from her.
    this.closeModal();
    this.applyFilter(inputTerm);
  }

  // Check if some modules is checked on filter and store number of modules checked
  public countCheckFiltersOnModules(checkedModules: Module[]): void {
    this.numberAccompanimentChecked = checkedModules.filter((module) => module.text === 'proceduresAccompaniment').length;
    this.numberTrainingChecked = checkedModules.filter(
      (module) =>
        module.text === 'baseSkills' ||
        module.text === 'socialAndProfessional' ||
        module.text === 'parentingHelp' ||
        module.text === 'accessRight' ||
        module.text === 'digitalCultureSecurity'
    ).length;
    this.numberPublicChecked = checkedModules.filter((module) => module.text === 'publicsAccompaniment').length;
    this.numberEquipmentChecked = checkedModules.filter((module) => module.text === 'equipmentsAndServices').length;
    this.numberMoreFiltersChecked = checkedModules.filter(
      (module) => module.text === 'labelsQualifications' || module.text === 'accessModality'
    ).length;
  }

  public getModalCategory(): Category[] {
    switch (this.modalTypeOpened) {
      case TypeModal.accompaniment:
        return this.categoriesAccompaniment;
      case TypeModal.training:
        return this.categoriesTraining;

      case TypeModal.public:
        return this.categoriesPublic;

      case TypeModal.equipments:
        return this.categoriesEquipment;

      case TypeModal.moreFilters:
        return this.categoriesMoreFilters;
      default:
        throw new Error('Modal type not handle');
    }
  }

  // Open the modal and display the list according to the right filter button
  public openModal(modalType: TypeModal): void {
    // if modal already opened, reset type
    if (this.modalTypeOpened === modalType) {
      this.closeModal();
    } else if (this.modalTypeOpened !== modalType) {
      this.modalTypeOpened = modalType;
    }
  }

  public closeModal(): void {
    this.modalTypeOpened = undefined;
  }

  // Management of the checkbox event (Check / Uncheck)
  public externalCheckboxCheck(event, categ, displayName): void {
    const checkValue: string = event.target.value;
    const inputTerm = this.searchForm.get('searchTerm').value;
    if (event.target.checked) {
      this.checkedModulesFilter.push(new Module(checkValue, categ, displayName));
      this.numberMoreFiltersChecked++;
    } else {
      // Check if the module is present in the list and remove it
      const index = this.checkedModulesFilter.findIndex((m: Module) => m.id === checkValue && m.text === categ);
      if (index > -1) {
        this.checkedModulesFilter.splice(index, 1);
        this.countCheckFiltersOnModules(this.checkedModulesFilter);
      }
    }
    this.applyFilter(inputTerm);
  }

  // Get the categories for each modal type
  private getData(): void {
    this.searchService.getCategoriesAccompaniment().subscribe((res) => {
      const categories: Category[] = res;
      categories.forEach((category) => {
        this.categoriesAccompaniment.push(category);
      });
    });
    this.searchService.getCategoriesTraining().subscribe((res) => {
      const categories: Category[] = res;
      categories.forEach((category) => {
        this.categoriesTraining.push(category);
      });
    });
    this.searchService.getCategoriesOthers().subscribe((res) => {
      const categories: Category[] = res;
      categories.forEach((category) => {
        if (category.id === 'publicsAccompaniment') {
          this.categoriesPublic.push(category);
        } else if (category.id === 'equipmentsAndServices') {
          this.categoriesEquipment.push(category);
        } else if (category.id === 'labelsQualifications' || category.id === 'accessModality') {
          this.categoriesMoreFilters.push(category);
        }
      });
    });
  }

  public resetFilters(): void {
    this.checkedModulesFilter = [];
    this.numberTrainingChecked = 0;
    this.numberAccompanimentChecked = 0;
    this.numberPublicChecked = 0;
    this.numberEquipmentChecked = 0;
    this.numberMoreFiltersChecked = 0;
    const inputTerm = this.searchForm.get('searchTerm').value;
    const filters = this.convertModulesTofilters(this.checkedModulesFilter, inputTerm);
    this.searchEvent.emit(filters);
  }
  public removeFilter(module: Module): void {
    const index = this.checkedModulesFilter.findIndex((m: Module) => m.id === module.id);
    this.checkedModulesFilter.splice(index, 1);
    const inputTerm = this.searchForm.get('searchTerm').value;
    const filters = this.convertModulesTofilters(this.checkedModulesFilter, inputTerm);
    this.countCheckFiltersOnModules(this.checkedModulesFilter);
    this.searchEvent.emit(filters);
  }
}
