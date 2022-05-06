import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from '../tooltip';
import { SvgIconComponent } from './svg-icon.component';

@NgModule({
  declarations: [SvgIconComponent],
  exports: [SvgIconComponent],
  imports: [CommonModule, TooltipModule]
})
export class SvgIconModule {}
