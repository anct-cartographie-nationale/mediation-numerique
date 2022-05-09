/* tslint:disable:member-ordering */
import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ModalOutsideDirective {
  constructor(private _elementRef: ElementRef) {}

  @Output() clickOutside: EventEmitter<any> = new EventEmitter();

  @HostListener('document:mousedown', ['$event.target']) onMouseEnter(targetElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(null);
    }
  }
}
