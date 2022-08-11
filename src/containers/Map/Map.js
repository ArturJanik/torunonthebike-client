import React, { useState, useEffect } from 'react';
import styles from './Map.module.css';

import MapWrapper from './MapWrapper/MapWrapper';
import TileLayer from './Layers/TileLayer/TileLayer';
import RouteLayer from './Layers/RouteLayer/RouteLayer';
import EventLayer from './Layers/EventLayer/EventLayer';
import ControlLayer from './Layers/ControlLayer/ControlLayer';
import CitybikeLayer from './Layers/CitybikeLayer/CitybikeLayer';

import { MapProvider } from '../../context/MapContext';

export const Map = () => {
  const [ showCitybikes, setShowCitybikes ] = useState(false);

  useEffect(() => {
    document.title = 'Interaktywna mapa rowerowa Torunia - Toruń.onthe.bike';
  }, []);

  const toggleCitybikes = () => {
    setShowCitybikes(!showCitybikes);
  };

  return (
    <section className={ styles.mapSection }>
      <MapProvider>
        <MapWrapper className={ styles.mapWrapper }>
          <TileLayer />
          <RouteLayer />
          <EventLayer />
          { showCitybikes && <CitybikeLayer /> }
        </MapWrapper>
        <ControlLayer toggleCitybikes={ toggleCitybikes } />
      </MapProvider>
    </section>
  );
};
