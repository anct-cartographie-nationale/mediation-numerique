import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Structure } from '../../map/models/structure.model';

export interface StructureRepository {
  getStructure(id: string): Observable<Structure>;
  sendMailOnStructureError: (structureId: string, content: string) => Observable<any>;
}

export const STRUCTURE_TOKEN: InjectionToken<StructureRepository> = new InjectionToken<StructureRepository>(
  'structure-list.structure.repository'
);
