import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './svg-icon.component';
import { TooltipModule } from '../../directives/tooltip';

@NgModule({
  declarations: [SvgIconComponent],
  exports: [SvgIconComponent],
  imports: [CommonModule, TooltipModule]
})
export class SvgIconModule {}
