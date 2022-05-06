import { InjectionToken } from '@angular/core';

export type MarkerTypeConfiguration = {
  structure: number;
  mdm: number;
  conseillerFrance: number;
  user: number;
};

export const MARKER_TYPE_TOKEN: InjectionToken<MarkerTypeConfiguration> = new InjectionToken<MarkerTypeConfiguration>(
  'marker-type.configuration'
);
