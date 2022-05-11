import { Inject, ModuleWithProviders, NgModule, Optional, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule, SvgIconModule } from '@gouvfr-anct/mediation-numerique/shared';
import { ModalModule, DayModule, PhoneModule, TextInputModalModule } from '@gouvfr-anct/mediation-numerique/shared';

import { ModalFilterComponent } from '../components/modal-filter/modal-filter.component';
import { StructureListSearchComponent } from '../components/search/structure-list-search.component';
import { CardComponent } from '../components/card/card.component';
import { StructureDetailsComponent } from '../components/structure-details/structure-details.component';
import { LogoCardComponent } from '../components/logo-card/logo-card.component';
import { StructureListComponent } from '../components/structure-list/structure-list.component';

import { SEARCH_TOKEN, SearchRepository } from '../repositories/search.repository';
import { STRUCTURE_TOKEN, StructureRepository } from '../repositories/structure.repository';

@NgModule({
  declarations: [
    ModalFilterComponent,
    StructureListSearchComponent,
    CardComponent,
    StructureDetailsComponent,
    LogoCardComponent,
    StructureListComponent
  ],
  exports: [StructureListSearchComponent, StructureListComponent, StructureDetailsComponent, CardComponent],
  imports: [
    CommonModule,
    FlexModule,
    ReactiveFormsModule,
    SvgIconModule,
    ButtonModule,
    ModalModule,
    DayModule,
    PhoneModule,
    TextInputModalModule
  ]
})
export class StructureModule {
  public static forRoot(
    searchRepository: Type<SearchRepository>,
    structureRepository: Type<StructureRepository>
  ): ModuleWithProviders<StructureModule> {
    return {
      ngModule: StructureModule,
      providers: [
        {
          provide: SEARCH_TOKEN,
          useClass: searchRepository
        },
        {
          provide: STRUCTURE_TOKEN,
          useClass: structureRepository
        }
      ]
    };
  }

  public constructor(
    @Optional() @Inject(SEARCH_TOKEN) private readonly searchRepository: SearchRepository,
    @Optional() @Inject(STRUCTURE_TOKEN) private readonly structureRepository: StructureRepository
  ) {
    if ([searchRepository].includes(null)) {
      throw new Error(
        'Cannot import `StructureListModule` without calling `forRoot` with valid parameters: you must provide defined `searchRepository` and `structureRepository`.'
      );
    }
  }
}
