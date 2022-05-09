import { divIcon } from 'leaflet';

export const markerIcon = divIcon({
  className: null,
  html: '<svg width="48" height="48" fill="#4C4D53"><use xlink:href="assets/ico/sprite.svg#map-marker"></use></svg>',
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48]
});
export const markerIconActive = divIcon({
  className: 'on-top-marker',
  html: '<svg width="48" height="48"><use xlink:href="assets/ico/sprite.svg#map-markerSelected"></use></svg>',
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48]
});
export const markerIconHover = divIcon({
  className: 'on-top-marker',
  html: '<svg width="48" height="48"><use xlink:href="assets/ico/sprite.svg#map-markerHover"></use></svg>',
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48]
});
export const markerIconAddedToList = divIcon({
  className: null,
  html: '<svg width="48" height="48"><use xlink:href="assets/ico/sprite.svg#map-marker-added"></use></svg>',
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48]
});
export const userLocationIcon = divIcon({
  className: null,
  html: '<svg width="34" height="34"><use xlink:href="assets/ico/sprite.svg#user-location"></use></svg>',
  iconSize: [34, 34],
  iconAnchor: [17, 0]
});
export const markerIconMdm = divIcon({
  className: null,
  html: '<svg width="19" height="24" fill="#D4C4A9" class="mdm"><use xlink:href="assets/ico/sprite.svg#mdm"></use></svg>',
  iconSize: [19, 24],
  iconAnchor: [9, 0]
});
export const markerIconMdmActive = divIcon({
  className: null,
  html: '<svg width="19" height="24"><use xlink:href="assets/ico/sprite.svg#mdmActive"></use></svg>',
  iconSize: [19, 24],
  iconAnchor: [9, 0]
});
export const markerIconFranceService = divIcon({
  className: null,
  html: '<svg width="48" height="48" fill="#ED3939" class="france-service"><use xlink:href="assets/ico/sprite.svg#conseillerFranceService"></use></svg>',
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48]
});
export const markerIconFranceServiceActive = divIcon({
  className: null,
  html: '<svg width="48" height="48"><use xlink:href="assets/ico/sprite.svg#conseillerFranceServiceSelected"></use></svg>',
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48]
});
export const markerIconFranceServiceHover = divIcon({
  className: null,
  html: '<svg width="48" height="48"><use xlink:href="assets/ico/sprite.svg#conseillerFranceServiceHover"></use></svg>',
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48]
});
export const markerIconFranceServiceAddedToList = divIcon({
  className: null,
  html: '<svg width="48" height="48"><use xlink:href="assets/ico/sprite.svg#conseillerFranceServiceAdded"></use></svg>',
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48]
});
