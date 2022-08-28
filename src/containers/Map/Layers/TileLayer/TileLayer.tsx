import { useContext, useEffect } from 'react';
import * as L from 'leaflet';
import { MapContext } from 'context/MapContext';

export const TileLayer = (): JSX.Element => {
  const mapCtx = useContext(MapContext);

  useEffect(() => {
    const tileLayerOptions = {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
    };

    const { map } = mapCtx.state;

    if (map !== null) {
      L.tileLayer(tileLayerOptions.url, {
        attribution: tileLayerOptions.attribution,
        maxZoom: 20,
        minZoom: 6,
        opacity: 0.5
      }).addTo(map);
    }
  }, []);

  return (
    <></>
  );
}
