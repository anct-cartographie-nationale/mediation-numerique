import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: ''
})
export class ButtonStubComponent {
  @Input() public style: string = '';
  @Input() public text: string;
  @Input() public type: string;
  @Input() public iconType = 'ico';
  @Input() public iconBtn: string;
  @Input() public iconPos = 'left';
  @Input() public extraClass: string;
  @Input() public disabled = false;
  @Input() public active = false;
  @Output() public action = new EventEmitter();
}
