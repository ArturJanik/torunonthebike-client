import { useEffect, useContext } from 'react';
import * as L from 'leaflet';
import 'leaflet-geometryutil';
import 'leaflet-almostover';
import 'leaflet/dist/leaflet.css';
import styles from './MapWrapper.module.css';

import { MapContext } from '../../../context/MapContext';

interface MapWrapperProps {
  children: JSX.Element[] | JSX.Element;
}

export const MapWrapper = ({ children }: MapWrapperProps): JSX.Element => {
  const mapCtx = useContext(MapContext);

  useEffect(() => {
    const mapOptions = {
      center: new L.LatLng(53.025,18.62),
      zoom: 14,
      zoomControl: false
    }
    const map = L.map('map', mapOptions);
    mapCtx.setMap(map);
  }, []);

  // If there is no map initialized
  // it will not render it's children layers (route layer, event layer etc.)
  return (
    <div id="map" className={ styles.mapWrapper }>
      { (mapCtx.state.map !== null) && children }
    </div>
  );
}
