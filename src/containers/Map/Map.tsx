import { useState, useEffect } from 'react';
import styles from './Map.module.css';

import { MapWrapper } from './MapWrapper/MapWrapper';
import { TileLayer } from './Layers/TileLayer/TileLayer';
import { RouteLayer } from './Layers/RouteLayer/RouteLayer';
import EventLayer from './Layers/EventLayer/EventLayer';
import { ControlLayer } from './Layers/ControlLayer/ControlLayer';
import CitybikeLayer from './Layers/CitybikeLayer/CitybikeLayer';

import { MapContextProvider } from '../../context/MapContext';
import { setTitle } from '../../utilities/setSeoTitle';

export const Map = (): JSX.Element => {
  const [ showCitybikes, setShowCitybikes ] = useState(false);

  useEffect(() => {
    setTitle('Interaktywna mapa rowerowa Torunia');
  }, []);

  const toggleCitybikes = (): void => {
    setShowCitybikes((prevState) => !prevState);
  };

  return (
    <section className={ styles.mapSection }>
      <MapContextProvider>
        <MapWrapper>
          <TileLayer />
          <RouteLayer />
          <EventLayer />
          { showCitybikes ? <CitybikeLayer /> : <></> }
        </MapWrapper>
        <ControlLayer toggleCitybikes={ toggleCitybikes } />
      </MapContextProvider>
    </section>
  );
};
