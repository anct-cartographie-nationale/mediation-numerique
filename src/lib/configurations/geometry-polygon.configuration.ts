import { InjectionToken } from '@angular/core';
import { FeatureCollection, Polygon } from 'geojson';

export type GeometryPolygonConfiguration = FeatureCollection<Polygon>;

export const GEOMETRY_POLYGON_TOKEN: InjectionToken<GeometryPolygonConfiguration> =
  new InjectionToken<GeometryPolygonConfiguration>('geometry-polygon.configuration');
