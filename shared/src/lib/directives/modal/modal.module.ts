import { NgModule } from '@angular/core';
import { ModalOutsideDirective } from './modalOutside.directive';

@NgModule({
  declarations: [ModalOutsideDirective],
  exports: [ModalOutsideDirective]
})
export class ModalModule {}
