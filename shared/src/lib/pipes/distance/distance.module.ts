import { NgModule } from '@angular/core';
import { DistancePipe } from './distance.pipe';

@NgModule({
  declarations: [DistancePipe],
  exports: [DistancePipe]
})
export class DistanceModule {}
