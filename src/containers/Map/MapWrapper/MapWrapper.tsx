import { useEffect, useContext } from 'react';
import * as L from 'leaflet';
import 'leaflet-geometryutil';
import 'leaflet-almostover';
import 'leaflet/dist/leaflet.css';
import { MapContext } from 'context/MapContext';
import styles from './MapWrapper.module.css';

interface MapWrapperProps {
  children: JSX.Element[] | JSX.Element;
}

const MAP_CONTAINER_ID = 'map';

export const MapWrapper = ({ children }: MapWrapperProps): JSX.Element => {
  const mapCtx = useContext(MapContext);

  const { map } = mapCtx.state;

  useEffect(() => {
    initializeMap();
  }, []);

  const initializeMap = (): void => {
    const mapOptions = {
      center: new L.LatLng(53.025,18.62),
      zoom: 14,
      zoomControl: false,
    };

    const mapObject = L.map(MAP_CONTAINER_ID, mapOptions);

    mapCtx.setMap(mapObject);
  };

  return (
    <div id={MAP_CONTAINER_ID} className={styles.mapWrapper}>
      { (map !== null) && children }
    </div>
  );
}
