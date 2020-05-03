import L from 'leaflet';

const circle = L.circleMarker([ 0,0 ], {
  radius: 6, 
  color: '#ff6600', 
  fillColor: 'white', 
  fillOpacity: 1, 
  className: 'mapCircle'
});

export default circle;
