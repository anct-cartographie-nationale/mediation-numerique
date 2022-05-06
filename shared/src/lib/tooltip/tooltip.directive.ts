import {
  Input,
  Renderer2,
  HostListener,
  Directive,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  ContentChild
} from '@angular/core';

@Directive({ selector: '[app-tooltipDirective]' })
export class TooltipDirective {
  @Input() title: string;
  constructor(private renderer: Renderer2, private elementRef: ElementRef, private viewContainerRef: ViewContainerRef) {}

  @Input() parametroPlantilla: TemplateRef<any>;

  @ContentChild('tooltipTemplate') private tooltipTemplateRef: TemplateRef<object>;

  @HostListener('mouseenter') onMouseEnter(): void {
    if (this.title && this.title.length > 0) {
      const view = this.viewContainerRef.createEmbeddedView(this.tooltipTemplateRef);
      view.rootNodes.forEach((node) => this.renderer.appendChild(this.elementRef.nativeElement, node));
    }
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    if (this.viewContainerRef) {
      this.viewContainerRef.clear();
    }
  }
}
