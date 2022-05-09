import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TextInputModalComponent } from './text-input-modal.component';

@NgModule({
  declarations: [TextInputModalComponent],
  exports: [TextInputModalComponent],
  imports: [CommonModule, FlexModule]
})
export class TextInputModalModule {}
