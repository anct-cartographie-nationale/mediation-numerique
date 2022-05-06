import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent {
  @Input() icon: string;
  @Input() iconClass: string;
  @Input() type: string;
  @Input() iconColor: string = 'none';
  @Input() title: string = null;
  constructor() {}
}
