import { Injectable } from '@angular/core';
import { DivIcon, Map, Marker } from 'leaflet';
import { Layers } from '../models/enum/layers.enum';
import { MarkerType } from '../models/enum/markerType.enum';
import {
  markerIcon,
  markerIconActive,
  markerIconAddedToList,
  markerIconHover,
  markerIconMdm,
  markerIconMdmActive,
  userLocationIcon
} from './marker';

@Injectable()
export class MapService {
  private static markersList = {};
  private isMarkerActive = false;

  public createMarker(lat: number, lon: number, markerType: MarkerType, id?: string, tooltip?: string): Marker {
    const marker = new Marker([lat, lon], {
      icon: this.getMarkerIcon(markerType),
      attribution: this.getLayerAttributton(markerType)
    });
    marker.on('mouseclick', (evt) => {
      evt.target.openPopup();
    });

    // handle icon change when select marker
    marker.on('click', (evt) => {
      evt.target.setIcon(this.getActiveMarkerIcon(markerType));
    });

    if (tooltip) {
      marker.bindPopup(tooltip);

      // handle icon change when unselect
      marker.getPopup().on('remove', (evt) => {
        marker.setIcon(this.getMarkerIcon(markerType));
      });
    }

    if (id) {
      MapService.markersList[id] = marker;
    }
    return marker;
  }

  private getLayerAttributton(markerType: MarkerType): string {
    if (markerType === MarkerType.mdm) {
      return Layers.mdm;
    } else if (markerType === MarkerType.user) {
      return Layers.user;
    } else {
      return Layers.structure;
    }
  }

  // Note: Marke IconFranceService has been removed temporarly on order to rework on buisness needs.
  // This comment is applied for the next 4 methods
  private getMarkerIcon(markerType: MarkerType): DivIcon {
    switch (markerType) {
      case MarkerType.mdm:
        return markerIconMdm;
      case MarkerType.conseillerFrance:
        return markerIcon;
      case MarkerType.user:
        return userLocationIcon;
      default:
        return markerIcon;
    }
  }

  private getActiveMarkerIcon(markerType: MarkerType): DivIcon {
    switch (markerType) {
      case MarkerType.mdm:
        return markerIconMdmActive;
      case MarkerType.conseillerFrance:
        // return markerIconFranceServiceActive;
        return markerIconActive;
      case MarkerType.user:
        return userLocationIcon;
      default:
        return markerIconActive;
    }
  }

  private getAddedToListMarkerIcon(markerType: MarkerType): DivIcon {
    switch (markerType) {
      case MarkerType.conseillerFrance:
        // return markerIconFranceServiceAddedToList;
        return markerIconAddedToList;
      case MarkerType.user:
        return userLocationIcon;
      default:
        return markerIconAddedToList;
    }
  }

  private getHoverMarkerIcon(markerType: MarkerType): DivIcon {
    switch (markerType) {
      case MarkerType.conseillerFrance:
        return markerIconHover;
      case MarkerType.user:
        return userLocationIcon;
      default:
        return markerIconHover;
    }
  }

  /**
   * @param id marker id
   */
  public setActiveMarker(id: string, type: MarkerType = MarkerType.structure): void {
    this.getMarker(id).setIcon(this.getHoverMarkerIcon(type));
  }

  public setAddedToListMarker(id: string, type: MarkerType = MarkerType.structure): void {
    this.getMarker(id).setIcon(this.getAddedToListMarkerIcon(type));
  }

  public setUnactiveMarker(id: string, type: MarkerType = MarkerType.structure): void {
    // To skip mouseleave when user emit click on structure list
    this.getMarker(id)?.setIcon(this.getMarkerIcon(type));
    this.isMarkerActive = false;
  }

  /**
   * Set a tooltip
   * @param id markerId
   * @param html html to display
   */
  public setToolTip(id: string, html: string): void {
    this.getMarker(id).bindTooltip(html);
  }

  /**
   * Set a marker as selected by changing icon color
   * @param id markerId
   * @param html html to display
   */
  public setSelectedMarker(id: string, type: MarkerType = MarkerType.structure): void {
    if (id) {
      this.getMarker(id)?.setIcon(this.getActiveMarkerIcon(type));
      this.isMarkerActive = true;
    }
  }

  /**
   * Set a marker as selected by changing icon color
   * @param id markerId
   * @param html html to display
   */
  public setDefaultMarker(id: string, type: MarkerType = MarkerType.structure): void {
    if (id) {
      this.getMarker(id).setIcon(this.getMarkerIcon(type));
    }
  }

  /**
   * Get marker by id
   */
  public getMarker(id: string): Marker {
    return MapService.markersList[id] ? MapService.markersList[id] : null;
  }

  public cleanMap(map: Map): Map {
    MapService.markersList = {};
    if (map) {
      map.eachLayer((layer) => {
        if (layer instanceof Marker && layer.options.attribution == Layers.structure) {
          map.removeLayer(layer);
        }
      });
    }
    return map;
  }
}
