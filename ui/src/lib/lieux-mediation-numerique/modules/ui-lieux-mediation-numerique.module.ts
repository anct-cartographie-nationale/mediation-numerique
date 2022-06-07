import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { LieuxMediationNumeriqueItemComponent } from '../components/lieux-mediation-numerique-item/lieux-mediation-numerique-item.component';
import { LieuxMediationNumeriqueListComponent } from '../components/lieux-mediation-numerique-list/lieux-mediation-numerique-list.component';
import { DistanceModule } from '@gouvfr-anct/mediation-numerique/shared';

@NgModule({
  declarations: [LieuxMediationNumeriqueItemComponent, LieuxMediationNumeriqueListComponent],
  exports: [LieuxMediationNumeriqueItemComponent, LieuxMediationNumeriqueListComponent],
  imports: [CommonModule, FlexModule, DistanceModule]
})
export class UiLieuxMediationNumeriqueModule {}
