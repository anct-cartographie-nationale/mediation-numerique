import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { GeoJson } from '../models/geojson.model';

export interface GeoJsonRepository {
  getMDMGeoJson(): Observable<GeoJson[]>;
  getTownshipCoord(town: string): Observable<Array<any>>;
}

export const GEO_JSON_TOKEN: InjectionToken<GeoJsonRepository> = new InjectionToken<GeoJsonRepository>(
  'map.geo-json.repository'
);
