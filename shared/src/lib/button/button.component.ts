import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonType } from './buttonType.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() public style: ButtonType = ButtonType.Regular;
  @Input() public text: string;
  @Input() public type: string;
  @Input() public iconType = 'ico';
  @Input() public iconBtn: string;
  @Input() public iconPos = 'left';
  @Input() public extraClass: string;
  @Input() public disabled = false;
  @Input() public active = false;
  @Output() public action = new EventEmitter();

  public buttonTypeEnum = ButtonType;

  public doAction(): void {
    this.action.emit();
  }
}
