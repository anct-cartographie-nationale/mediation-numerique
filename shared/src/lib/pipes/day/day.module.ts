import { NgModule } from '@angular/core';
import { DayPipe } from './day.pipe';

@NgModule({
  declarations: [DayPipe],
  exports: [DayPipe]
})
export class DayModule {}
