import { useState, useEffect, useContext } from 'react';
import * as L from 'leaflet';
import { MapContext } from '../../../../../context/MapContext';
import { RouteOptions, Routes } from '../RouteLayer';

interface GeoJSONProps {
  data: Routes;
  options: RouteOptions;
}

export const GeoJSON = ({ data, options }: GeoJSONProps): JSX.Element => {
  const mapCtx = useContext(MapContext);
  const { map } = mapCtx.state;

  const [lanesLayer, setLanesLayer] = useState<L.GeoJSON<any> | null>(null);

  useEffect(() => {
    showGeoJSONRoutes();
  }, []);

  useEffect(() => {
    if (lanesLayer !== null && map !== null && map.hasLayer(lanesLayer)) {
      map.removeLayer(lanesLayer);
      // @ts-ignore
      map.almostOver.removeLayer(lanesLayer);
      showGeoJSONRoutes();
    }
  }, [options]);

  const showGeoJSONRoutes = (): void => {
    if (map !== null) {
      const routes = L.geoJSON(data, options).addTo(map);
      // @ts-ignore
      map.almostOver.addLayer(routes);
      setLanesLayer(routes);
    }
  }

  return (
    <></>
  );
}

export default GeoJSON;
