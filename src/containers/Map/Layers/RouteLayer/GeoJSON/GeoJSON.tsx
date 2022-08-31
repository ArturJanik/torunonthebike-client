import { useState, useEffect } from 'react';
import * as L from 'leaflet';
import { RouteOptions, Routes } from '../RouteLayer';

interface GeoJSONProps {
  data: Routes;
  options: RouteOptions;
  map: L.Map;
}

export const GeoJSON = ({ data, options, map }: GeoJSONProps): JSX.Element => {
  const [lanesLayer, setLanesLayer] = useState<L.GeoJSON<any> | null>(null);

  useEffect(() => {
    showGeoJSONRoutes();
  }, []);

  useEffect(() => {
    if (lanesLayer !== null && map.hasLayer(lanesLayer)) {
      map.removeLayer(lanesLayer);
      // @ts-ignore
      map.almostOver.removeLayer(lanesLayer);
      showGeoJSONRoutes();
    }
  }, [options]);

  const showGeoJSONRoutes = (): void => {
    const routes = L.geoJSON(data, options).addTo(map);
    // @ts-ignore
    map.almostOver.addLayer(routes);
    setLanesLayer(routes);
  }

  return (
    <></>
  );
}
