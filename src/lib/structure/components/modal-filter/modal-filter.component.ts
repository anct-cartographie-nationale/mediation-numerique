import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ButtonType } from '@gouvfr-anct/mediation-numerique/shared';
import { TypeModal } from '../../models/enum/typeModal.enum';
import { Category } from '../../models/category.model';
import { Module } from '../../models/module.model';
import { SEARCH_TOKEN, SearchRepository } from '../../repositories/search.repository';

@Component({
  selector: 'app-modal-filter',
  templateUrl: './modal-filter.component.html',
  styleUrls: ['./modal-filter.component.scss']
})
export class ModalFilterComponent implements OnInit, OnChanges {
  constructor(@Inject(SEARCH_TOKEN) readonly searchService: SearchRepository) {}

  @Input() public modalType: TypeModal;
  @Input() public categories: Category[];
  //checked modules filter list
  @Input() public modules: Module[] = [];
  @Output() searchEvent = new EventEmitter();
  @Output() closeEvent = new EventEmitter();
  public buttonTypeEnum = ButtonType;

  // Checkbox variable
  public checkedModules: Module[] = [];
  public toggledCategories: string[] = [];
  ngOnInit(): void {
    // Manage checkbox
    this.checkedModules = this.modules.slice();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.modalType) {
      this.checkedModules = this.modules.slice();
    }
  }

  // Management of the checkbox event (Check / Uncheck)
  public onCheckboxChange(event, categ: string, text?: string): void {
    const checkValue: string = event.target.value;
    if (event.target.checked) {
      this.checkedModules.push(new Module(checkValue, categ, text ? text : checkValue));
    } else {
      // Check if the module is present in the list and remove it
      if (this.searchService.getIndex(this.checkedModules, checkValue, categ) > -1) {
        this.checkedModules.splice(this.searchService.getIndex(this.checkedModules, checkValue, categ), 1);
      }
    }
  }
  // Clear only filters in the current modal
  public clearFilters(): void {
    this.categories.forEach((categ: Category) => {
      categ.modules.forEach((module: Module) => {
        const index = this.searchService.getIndex(this.checkedModules, module.id, categ.id);
        if (index > -1) {
          this.checkedModules.splice(index, 1);
        }
      });
    });
    this.emitModules(this.checkedModules);
  }

  // Sends an array containing all modules
  public emitModules(m: Module[]): void {
    this.searchEvent.emit(m);
  }

  public getModalType(): string {
    switch (this.modalType) {
      case TypeModal.accompaniment:
        return 'accompaniment';
      case TypeModal.training:
        return 'training';
      case TypeModal.public:
        return 'public';
      case TypeModal.equipments:
        return 'equipments';
      case TypeModal.moreFilters:
        return 'moreFilters';
      default:
        return '';
    }
  }

  public closeModal(): void {
    this.closeEvent.emit();
  }

  public handleCategoryCheckBox(event, category: Category): void {
    const modules = this.categories.filter((c: Category) => c.id === category.id)[0].modules;
    if (event.target.checked) {
      for (const module of modules) {
        if (this.searchService.getIndex(this.checkedModules, module.id, category.id) === -1) {
          this.checkedModules.push(new Module(module.id, category.id, module.displayText));
        }
      }
    } else {
      for (const module of modules) {
        if (this.searchService.getIndex(this.checkedModules, module.id, category.id) > -1) {
          this.checkedModules.splice(this.searchService.getIndex(this.checkedModules, module.id, category.id), 1);
        }
      }
    }
  }

  public toggleShowCategory(categoryId: string): void {
    if (this.toggledCategories.includes(categoryId)) {
      const index = this.toggledCategories.indexOf(categoryId);
      this.toggledCategories.splice(index);
    } else {
      this.toggledCategories.push(categoryId);
    }
  }

  public getCategoryCheckboxStatus(c: Category): string {
    const selectedModule: Module[] = this.checkedModules.filter((m) => m.text === c.id);
    if (selectedModule.length === c.modules.length) {
      return 'checked';
    } else if (selectedModule.length === 0) {
      return 'unchecked';
    } else if (selectedModule.length && selectedModule.length > 0) {
      return 'halfChecked';
    }
  }
}
