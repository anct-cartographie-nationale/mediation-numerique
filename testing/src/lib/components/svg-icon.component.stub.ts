import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  template: ''
})
export class SvgIconStubComponent {
  @Input() icon: string;
  @Input() iconClass: string;
  @Input() type: string;
  @Input() iconColor: string = 'none';
  @Input() title: string = null;
}
