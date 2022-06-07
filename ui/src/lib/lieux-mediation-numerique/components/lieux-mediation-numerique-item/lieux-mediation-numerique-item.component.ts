import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Structure } from '@gouvfr-anct/mediation-numerique';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'fr-lieux-mediation-numerique-item',
  templateUrl: './lieux-mediation-numerique-item.component.html',
  styleUrls: ['./lieux-mediation-numerique-item.component.scss']
})
export class LieuxMediationNumeriqueItemComponent {
  @Input() public structure!: Structure;
  @Input() public isSelected: boolean = false;
  @Input() public isOrientation: boolean = false;
  @Input() public isClaimed = true;
  @Output() public showDetails: EventEmitter<Structure> = new EventEmitter<Structure>();
  @Output() public addToList: EventEmitter<Structure> = new EventEmitter<Structure>();
  @Output() public hover: EventEmitter<Structure> = new EventEmitter<Structure>();
}
