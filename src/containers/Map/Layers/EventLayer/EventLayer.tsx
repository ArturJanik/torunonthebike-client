import { useContext, useEffect } from 'react';
import { MapContext } from 'context/MapContext';
import createRoutePopup from './RoutePopup/RoutePopup';
import circle from './Circle/Circle';
import './EventLayer.css';

export const EventLayer = (): JSX.Element => {
  const mapCtx = useContext(MapContext);
  const { map } = mapCtx.state;

  useEffect(() => {
    if (map === null) {
      return;
    }

    map.on('almost:over', (e) => {
      if (e.layer.options.opacity !== 0){
        circle.bindTooltip(e.layer.feature.properties.street, {
          className: 'mouseOverTooltip',
        });
        map.addLayer(circle);

        e.layer.setStyle({ color: '#ff6600', dashArray: 6 });
      }
    });

    map.on('almost:move', function (e: any) {
      const pointerPosition = e.latlng;
      circle.openTooltip();

      circle.setLatLng(pointerPosition);
    });

    map.on('almost:out', function (e) {
      circle.unbindTooltip();
      map.removeLayer(circle);
      e.layer.setStyle({ color: e.layer.feature.currentColor, dashArray: 0 });
    });

    map.on('almost:click', function (e) {
      if (e.layer.options.opacity !== 0){
        e.layer.unbindPopup();
        const popup = createRoutePopup('bikelane', e.layer.feature.properties);
        e.layer.bindPopup(popup, {
          className: 'popup',
          minWidth: 200,
        }).openPopup();
      }
    });
  }, []);

  return (
    <></>
  );
}

export default EventLayer;
