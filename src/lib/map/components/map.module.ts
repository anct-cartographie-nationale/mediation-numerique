import { CommonModule } from '@angular/common';
import { Inject, ModuleWithProviders, NgModule, Optional, Type } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map.component';
import {
  ZOOM_LEVEL_TOKEN,
  ZoomLevelConfiguration,
  MARKER_TYPE_TOKEN,
  MarkerTypeConfiguration,
  GEOMETRY_POLYGON_TOKEN,
  GeometryPolygonConfiguration
} from '../../configurations';
import { GEO_JSON_TOKEN, GeoJsonRepository } from '../repositories';

@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent],
  imports: [CommonModule, LeafletModule]
})
export class MapModule {
  public static forRoot(
    geometryPolygonConfiguration: GeometryPolygonConfiguration,
    zoomLevelConfiguration: ZoomLevelConfiguration,
    markerTypeConfiguration: MarkerTypeConfiguration,
    geoJsonRepository: Type<GeoJsonRepository>
  ): ModuleWithProviders<MapModule> {
    return {
      ngModule: MapModule,
      providers: [
        { provide: GEO_JSON_TOKEN, useClass: geoJsonRepository },
        { provide: GEOMETRY_POLYGON_TOKEN, useValue: geometryPolygonConfiguration },
        { provide: MARKER_TYPE_TOKEN, useValue: markerTypeConfiguration },
        { provide: ZOOM_LEVEL_TOKEN, useValue: zoomLevelConfiguration }
      ]
    };
  }

  public constructor(
    @Optional() @Inject(GEOMETRY_POLYGON_TOKEN) private readonly geometryPolygonConfiguration: GeometryPolygonConfiguration,
    @Optional() @Inject(MARKER_TYPE_TOKEN) private readonly markerType: MarkerTypeConfiguration,
    @Optional() @Inject(ZOOM_LEVEL_TOKEN) private readonly zoomLevel: ZoomLevelConfiguration,
    @Optional() @Inject(GEO_JSON_TOKEN) private readonly geoJsonRepository: GeoJsonRepository
  ) {
    if ([geometryPolygonConfiguration, markerType, zoomLevel, geoJsonRepository].includes(null)) {
      throw new Error(
        'Cannot import `MapModule` without calling `forRoot` with valid parameters: you must provide defined `geometryPolygonConfiguration`, `markerType`, `zoomLevel` and `geoJsonRepository`.'
      );
    }
  }
}
