import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MapOptions, Map } from 'leaflet';

@Component({
  selector: 'app-map',
  template: ''
})
export class MapStubComponent {
  @Input() public isOrientationForm = false;
  @Input() public structures: any[] = [];
  @Input() public structuresToPrint: any[] = [];
  @Input() public toogleToolTipId: string;
  @Input() public selectedMarkerId: string;
  @Input() public isMapPhone: boolean;
  @Input() public searchedValue: string | [number, number];
  @Output() public selectedStructure: EventEmitter<any> = new EventEmitter<any>();
  @Output() public orientationButtonClick: EventEmitter<any> = new EventEmitter<any>();

  public map: Map;
  public mapOptions: MapOptions;
}
