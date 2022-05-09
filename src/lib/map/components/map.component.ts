import { Component, EventEmitter, HostListener, Inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import L, { latLng, MapOptions, geoJSON, tileLayer, Map, latLngBounds, layerGroup } from 'leaflet';
import * as _ from 'lodash';
import { Structure } from '../models/structure.model';
import { GeoJsonProperties } from '../models/geoJsonProperties.model';
import { MapService } from './map.service';
import { GEOMETRY_POLYGON_TOKEN, GeometryPolygonConfiguration } from '../../configurations/geometry-polygon.configuration';
import { ZOOM_LEVEL_TOKEN, ZoomLevelConfiguration } from '../../configurations/zoom-level.configuration';
import { MARKER_TYPE_TOKEN, MarkerTypeConfiguration } from '../../configurations/marker-type.configuration';
import { GEO_JSON_TOKEN, GeoJsonRepository } from '../repositories/geo-json.repository';

@Component({
  selector: 'app-map',
  providers: [MapService],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges {
  @Input() public isOrientationForm = false;
  @Input() public structures: Structure[] = [];
  @Input() public structuresToPrint: Structure[] = [];
  @Input() public toogleToolTipId: string;
  @Input() public selectedMarkerId: string;
  @Input() public isMapPhone: boolean;
  @Input() public searchedValue: string | [number, number];
  @Output() public selectedStructure: EventEmitter<Structure> = new EventEmitter<Structure>();
  @Output() public orientationButtonClick: EventEmitter<Structure> = new EventEmitter<Structure>();
  private currentStructure: Structure;

  public map: Map;
  public mapOptions: MapOptions;

  // Add listener on the popup button to show details of structure
  @HostListener('document:click', ['$event'])
  public clickout(event): void {
    if (event.target.classList.contains('btnShowDetails')) {
      this.selectedStructure.emit(this.currentStructure);
    }
    if (event.target.classList.contains('add')) {
      this.orientationButtonClick.emit(this.currentStructure);
      this.getStructuresPositions(this.structures);
    }
  }

  constructor(
    @Inject(GEOMETRY_POLYGON_TOKEN) private readonly metropole: GeometryPolygonConfiguration,
    @Inject(MARKER_TYPE_TOKEN) private readonly markerType: MarkerTypeConfiguration,
    @Inject(ZOOM_LEVEL_TOKEN) private readonly zoomLevel: ZoomLevelConfiguration,
    @Inject(GEO_JSON_TOKEN) private readonly geoJsonService: GeoJsonRepository,
    private readonly mapService: MapService
  ) {
    this.initializeMapOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchedValue && !changes.searchedValue.firstChange) {
      if (changes.searchedValue.currentValue) {
        this.processTownCoordinate(changes.searchedValue.currentValue);
      } else {
        this.map.setView(this.mapOptions.center, this.mapOptions.zoom);
      }
    }
    if (changes.isMapPhone) {
      if (this.isMapPhone) {
        setTimeout(() => {
          this.map.invalidateSize();
        }, 0);
      }
    }
    if (changes.structures) {
      this.handleStructurePosition(changes.structures.previousValue);
    }
    // Handle map marker tooltip
    if (changes.toogleToolTipId && changes.toogleToolTipId.currentValue !== changes.toogleToolTipId.previousValue) {
      if (changes.toogleToolTipId.previousValue !== undefined) {
        if (this.isToPrint(changes.toogleToolTipId.previousValue)) {
          this.mapService.setAddedToListMarker(
            changes.toogleToolTipId.previousValue,
            this.getMarkerTypeByStructureId(changes.toogleToolTipId.previousValue)
          );
        } else {
          this.mapService.setUnactiveMarker(
            changes.toogleToolTipId.previousValue,
            this.getMarkerTypeByStructureId(changes.toogleToolTipId.previousValue)
          );
        }
      }
      if (changes.toogleToolTipId.currentValue !== undefined) {
        this.mapService.setActiveMarker(
          changes.toogleToolTipId.currentValue,
          this.getMarkerTypeByStructureId(changes.toogleToolTipId.currentValue)
        );
      }
    }
    // Handle map marker if none selected
    if (changes.selectedMarkerId && this.map) {
      this.map.closePopup();
      if (changes.selectedMarkerId.currentValue === undefined) {
        this.mapService.setDefaultMarker(
          changes.selectedMarkerId.previousValue,
          this.getMarkerTypeByStructureId(changes.selectedMarkerId.previousValue)
        );
        this.map.setView(this.mapOptions.center, this.mapOptions.zoom);
      }
    }
    // Handle map marker if one is set with url or selected
    if (this.mapService.getMarker(this.selectedMarkerId)) {
      this.mapService.setSelectedMarker(this.selectedMarkerId, this.getMarkerTypeByStructureId(this.selectedMarkerId));
      this.centerLeafletMapOnMarker(this.selectedMarkerId);
    }

    this.closePreviousMarker(changes);

    if (changes.structuresToPrint) {
      if (changes.structuresToPrint.currentValue < changes.structuresToPrint.previousValue) {
        this.mapService?.setUnactiveMarker(
          this.toogleToolTipId,
          this.getMarkerTypeByStructureId(changes.structuresToPrint.previousValue)
        );
      }
      this.structuresToPrint.forEach((structure: Structure) => {
        this.mapService.setAddedToListMarker(structure._id, this.getMarkerTypeByStructureId(structure._id));
      });
    }
  }

  public processTownCoordinate(queryString: string): void {
    this.geoJsonService.getTownshipCoord(queryString).subscribe(
      (townData) => {
        if (townData.length > 0) {
          const bounds = new L.LatLngBounds(townData.map((dataArray) => dataArray.reverse()));
          this.map.fitBounds(bounds);
        }
      },
      (err) => {
        this.map.setView(this.mapOptions.center, this.mapOptions.zoom);
      }
    );
  }

  /**
   * Create a user position marcker and center the map on it with a zoom level defined in ZoomLevel
   * @param coords {[number, number]} Map center position
   */
  public centerOnCoordinates(coords: [number, number]): void {
    this.mapService.createMarker(coords[1], coords[0], this.markerType.user, 'userLocation').addTo(this.map);
    this.map.setView(new L.LatLng(coords[1], coords[0]), this.zoomLevel.userPosition);
  }

  /**
   * Get structures positions and add marker corresponding to those positons on the map
   */
  private handleStructurePosition(previousStructuresValue: Structure[]): void {
    // If there is more structure than before, append them
    if (
      previousStructuresValue &&
      previousStructuresValue.length > 0 &&
      previousStructuresValue.length < this.structures.length
    ) {
      this.getStructuresPositions(_.differenceWith(this.structures, previousStructuresValue, _.isEqual));
    } else if (this.structures) {
      this.map = this.mapService.cleanMap(this.map);
      this.getStructuresPositions(this.structures);
      this.structuresToPrint.forEach((structure: Structure) => {
        this.mapService.setAddedToListMarker(structure._id, this.getMarkerTypeByStructureId(structure._id));
      });
    }
  }

  private isToPrint(id: string): boolean {
    return this.structuresToPrint.findIndex((elem) => elem._id == id) > -1 ? true : false;
  }

  /**
   * Returns according marker type base on {MarkerType}
   * @param {Structure} structure
   * @returns {number}
   */
  private getMarkerType(structure: Structure): number {
    return structure?.labelsQualifications?.includes('conseillerNumFranceServices')
      ? this.markerType.conseillerFrance
      : this.markerType.structure;
  }

  /**
   * Return the map marker type given a structure id
   * @param {string} id - Structure id
   * @returns {number}
   */
  private getMarkerTypeByStructureId(id: string): number {
    return this.getMarkerType(this.structures.find((structure) => structure._id === id));
  }

  private getStructuresPositions(structureList: Structure[]): void {
    for (const structure of structureList) {
      this.mapService
        .createMarker(
          structure.getLat(),
          structure.getLon(),
          this.getMarkerType(structure),
          structure._id,
          this.buildToolTip(structure)
        )
        .addTo(this.map)
        // store structure before user click on button
        .on('popupopen', () => {
          this.currentStructure = structure;
        });
    }
  }

  /**
   * Create tooltip for display
   * @param structure Structure
   */
  private buildToolTip(structure: Structure): string {
    let cssAvailabilityClass = structure.isOpen ? 'available' : null;
    if (cssAvailabilityClass === null) {
      if (structure.openedOn.day) {
        cssAvailabilityClass = 'unavailable';
      } else {
        cssAvailabilityClass = 'unknown';
      }
    }
    return (
      '<h1>' +
      structure.structureName +
      '</h1>' +
      '<p>' +
      structure.getLabelTypeStructure() +
      '</p>' +
      (this.isOrientationForm
        ? '<div class="pop-up orientation"><button type="button" class="orientationButton btnShowDetails"><span class="ico-gg-eye-alt eye"></span>Voir</button></div>'
        : '<div class="pop-up"><button type="button" class="btnShowDetails">Voir</button></div>')
    );
  }

  private buildMdmPopUp(mdmProperties: GeoJsonProperties): string {
    return `<h1>${mdmProperties.nom}</h1><p>${mdmProperties.adresse}</p>`;
  }

  /**
   * Add marker when map is ready to be showned
   * @param map map
   */
  public onMapReady(map: Map): void {
    this.map = map;
    if (this.searchedValue) {
      if (Array.isArray(this.searchedValue)) {
        this.centerOnCoordinates(this.searchedValue);
      }
    }
  }

  /**
   * Init map options :
   * - Metropole bounds based on a WMS service hosted by data.grandlyon.com
   * - Map Layer based on open street maps
   */
  private initializeMapOptions(): void {
    // Init mdm
    this.initMDMLayer();
    // Init WMS service with param from data.grandlyon.com
    layerGroup();
    const carteLayer = tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: this.zoomLevel.max
    });
    // Center is set on townhall
    // Zoom is blocked on 11 to prevent people to zoom out from metropole
    this.mapOptions = {
      center: latLng(46.28146057911664, 4.468874066180609),
      maxZoom: this.zoomLevel.max,
      zoom: this.zoomLevel.regular,
      minZoom: this.zoomLevel.min,
      layers: [carteLayer]
    };
  }

  private initMDMLayer(): void {
    this.geoJsonService.getMDMGeoJson().subscribe((res) => {
      res.forEach((mdm) => {
        this.mapService
          .createMarker(
            mdm.geometry.getLat(),
            mdm.geometry.getLon(),
            this.markerType.mdm,
            null,
            this.buildMdmPopUp(mdm.properties)
          )
          .addTo(this.map);
      });
      this.initMetropoleLayer();
    });
  }

  private centerLeafletMapOnMarker(markerId: string): void {
    if (this.mapService.getMarker(markerId)) {
      const marker = this.mapService.getMarker(markerId);
      const latLngs = [marker.getLatLng()];
      const markerBounds = latLngBounds(latLngs);
      // paddingTopLeft is used for centering marker because of structure details pane
      this.map.fitBounds(markerBounds, { paddingTopLeft: [300, 0] });
    }
  }

  private initMetropoleLayer(): void {
    this.map.addLayer(
      geoJSON(
        {
          type: this.metropole.features[0].geometry.type,
          coordinates: this.metropole.features[0].geometry.coordinates
        } as any,
        { style: () => ({ color: '#a00000', fillOpacity: 0, weight: 1 }) }
      )
    );
  }

  /**
   * Close previous markers
   * - if strucure is closed
   * - if a new marker is selected
   */
  private closePreviousMarker(changes: SimpleChanges): void {
    if (
      (changes.selectedMarkerId?.currentValue === undefined && changes.selectedMarkerId?.previousValue) ||
      changes.selectedMarkerId?.currentValue !== changes.selectedMarkerId?.previousValue
    ) {
      this.mapService.setUnactiveMarker(
        changes.selectedMarkerId.previousValue,
        this.getMarkerTypeByStructureId(changes.selectedMarkerId.previousValue)
      );
    }
  }
}
