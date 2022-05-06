import { Input, Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[app-tooltipDirective]' })
export class TooltipStubDirective {
  @Input() title: string;

  @Input() parametroPlantilla: TemplateRef<any>;
}
