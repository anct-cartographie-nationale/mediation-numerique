import { Component, Input } from '@angular/core';
import { Demarches } from '../../models/enum/demarches.enum';
import { Labels } from '../../models/enum/labels.emum';

@Component({
  selector: 'app-logo-card',
  templateUrl: './logo-card.component.html',
  styleUrls: ['./logo-card.component.scss']
})
export class LogoCardComponent {
  @Input() public logoPath: string;
  @Input() public name: string;

  public getName(key: string): string {
    if (Labels[key]) {
      return Labels[key];
    } else {
      return Demarches[key];
    }
  }
}
