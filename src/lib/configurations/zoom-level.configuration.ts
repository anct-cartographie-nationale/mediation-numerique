import { InjectionToken } from '@angular/core';

export type ZoomLevelConfiguration = {
  min: number;
  regular: number;
  userPosition: number;
  max: number;
};

export const ZOOM_LEVEL_TOKEN: InjectionToken<ZoomLevelConfiguration> = new InjectionToken<ZoomLevelConfiguration>(
  'zoom-level.configuration'
);
