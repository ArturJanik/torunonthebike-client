import * as L from 'leaflet';

export const Circle = L.circleMarker([0, 0], {
  radius: 6, 
  color: '#ff6600', 
  fillColor: 'white', 
  fillOpacity: 1, 
  className: 'mapCircle'
});
