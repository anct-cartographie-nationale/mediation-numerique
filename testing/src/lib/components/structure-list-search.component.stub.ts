import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-structure-list-search',
  template: ''
})
export class StructureListSearchStubComponent {
  @Output() searchEvent = new EventEmitter();
}
