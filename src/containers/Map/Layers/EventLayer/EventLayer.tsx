import { useContext, useEffect } from 'react';
import { LeafletEvent } from 'leaflet';
import { MapContext } from 'context/MapContext';
import { createRoutePopup } from './RoutePopup/RoutePopup';
import { Circle } from './Circle/Circle';
import './EventLayer.css';

export const EventLayer = (): JSX.Element => {
  const mapCtx = useContext(MapContext);
  const { map } = mapCtx.state;

  useEffect(() => {
    if (map === null) {
      return;
    }

    map.on('almost:over', onMouseOverBikelane);
    map.on('almost:move', onMouseMoveOverBikelane);
    map.on('almost:out', onMouseLeaveBikelane);
    map.on('almost:click', onMouseClickOnBikelane);
  }, []);

  const onMouseOverBikelane = (event: LeafletEvent): void => {
    if (map !== null && event.layer.options.opacity !== 0){
      Circle.bindTooltip(event.layer.feature.properties.street, {
        className: 'mouseOverTooltip',
      });
      map.addLayer(Circle);

      // we cant' use event.propagatedFrom until we rewrite almost-over plugin to use it
      event.layer.setStyle({ color: '#ff6600', dashArray: 6 });
    }
  };

  const onMouseMoveOverBikelane = (event: any): void => {
    const pointerPosition = event.latlng;
    Circle.openTooltip();

    Circle.setLatLng(pointerPosition);
  };

  const onMouseLeaveBikelane = (event: LeafletEvent): void => {
    if (map !== null) {
      Circle.unbindTooltip();
      map.removeLayer(Circle);
      event.layer.setStyle({ color: event.layer.feature.currentColor, dashArray: 0 });
    }
  };

  const onMouseClickOnBikelane = (event: LeafletEvent): void => {
    if (event.layer.options.opacity !== 0){
      event.layer.unbindPopup();

      const popup = createRoutePopup('bikelane', event.layer.feature.properties);

      event.layer.bindPopup(popup, {
        className: 'popup',
        minWidth: 200,
      }).openPopup();
    }
  };

  return (
    <></>
  );
}

export default EventLayer;
