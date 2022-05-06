import { AddressGeometry } from './addressGeometry.model';
import { GeoJsonProperties } from './geoJsonProperties.model';

export class GeoJson {
  public geometry: AddressGeometry;
  public type: string;
  public properties: GeoJsonProperties;

  constructor(obj?: any) {
    Object.assign(this, obj, {
      geometry: obj && obj.geometry ? new AddressGeometry(obj.geometry) : null
    });
  }
}
