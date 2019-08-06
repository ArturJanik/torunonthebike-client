import { PureComponent } from 'react';
import { MapContext } from '../../../../context/MapContext';
import createPopup from './RoutePopup/RoutePopup';
import circle from './Circle/Circle';

import './EventLayer.css';

class EventLayer extends PureComponent {
  componentDidMount(){
    const {map} = this.context;

    map.on('almost:over', (e) => {
      if(e.layer.options.opacity !== 0){
        map.addLayer(circle);
        e.layer.setStyle({color: '#ff6600', dashArray: 6});
      }
    })

    map.on('almost:move', function (e) {
      const pointerPosition = e.latlng;
      circle.bindTooltip(e.layer.feature.properties.street);

      circle.setLatLng(pointerPosition);
    })

    map.on('almost:out', function (e) {
      circle.unbindTooltip();
      map.removeLayer(circle);
      e.layer.setStyle({color: e.layer.feature.currentColor, dashArray: 0});
    })

    map.on('almost:click', function (e) {
      if(e.layer.options.opacity !== 0){
        e.layer.unbindPopup();
        const popup = createPopup('bikelane', e.layer.feature.properties);
        e.layer.bindPopup(popup, {className: 'popup', minWidth: 200}).openPopup();
      }
    })
  }

  render = () => null;
}
EventLayer.contextType = MapContext;

export default EventLayer;