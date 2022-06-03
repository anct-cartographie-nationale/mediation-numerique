import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Structure } from '@gouvfr-anct/mediation-numerique';

@Component({
  selector: 'app-structure-details',
  template: ''
})
export class StructureDetailsStubComponent {
  @Input() public structure: Structure;
  @Output() public closeDetails: EventEmitter<boolean> = new EventEmitter<boolean>();
}
