import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Structure } from '@gouvfr-anct/mediation-numerique';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'fr-lieux-mediation-numerique-list',
  templateUrl: './lieux-mediation-numerique-list.component.html',
  styleUrls: ['./lieux-mediation-numerique-list.component.scss']
})
export class LieuxMediationNumeriqueListComponent {
  @Input() public structureList: Structure[] = [];
  @Output() public displayMapMarkerId: EventEmitter<string> = new EventEmitter<string>();
}
