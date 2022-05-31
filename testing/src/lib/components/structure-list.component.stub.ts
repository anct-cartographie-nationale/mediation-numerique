import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeoJson, Structure } from '@gouvfr-anct/mediation-numerique';

@Component({
  selector: 'app-structure-list',
  template: ''
})
export class StructureListStubComponent {
  @Input() public structureList: Structure[];
  @Input() public location: GeoJson;
  @Input() public selectedStructure: Structure = new Structure();
  @Output() public displayMapMarkerId: EventEmitter<string> = new EventEmitter<string>();
  @Output() public selectedMarkerId: EventEmitter<string> = new EventEmitter<string>();
}
