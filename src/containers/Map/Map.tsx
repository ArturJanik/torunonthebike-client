import { useEffect } from 'react';

import { MapWrapper } from './MapWrapper/MapWrapper';
import { TileLayer } from './Layers/TileLayer/TileLayer';
import { RouteLayer } from './Layers/RouteLayer/RouteLayer';
import { EventLayer } from './Layers/EventLayer/EventLayer';
import { ControlLayer } from './Layers/ControlLayer/ControlLayer';

import { MapContextProvider } from 'context/MapContext';
import { setTitle } from 'utilities/setSeoTitle';

import styles from './Map.module.css';

export const Map = (): JSX.Element => {
  useEffect(() => {
    setTitle('Interaktywna mapa rowerowa Torunia');
  }, []);

  return (
    <section className={ styles.mapSection }>
      <MapContextProvider>
        <MapWrapper>
          <TileLayer />
          <RouteLayer />
          <EventLayer />
        </MapWrapper>
        <ControlLayer />
      </MapContextProvider>
    </section>
  );
};
