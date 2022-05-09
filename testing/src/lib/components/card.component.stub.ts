import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  template: ''
})
export class CardStubComponent {
  @Input() public structure: any;
  @Input() public isSelected: boolean;
  @Input() public isOrientation: boolean;
  @Output() public showDetails: EventEmitter<any> = new EventEmitter<any>();
  @Output() public addToList: EventEmitter<any> = new EventEmitter<any>();
  @Output() public hover: EventEmitter<any> = new EventEmitter<any>();
}
