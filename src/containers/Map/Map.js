import React, { Component } from 'react';
import styles from './Map.module.css';

import MapWrapper from './MapWrapper/MapWrapper'
import TileLayer from './Layers/TileLayer/TileLayer'

import { MapProvider } from '../../context/MapContext';

class Map extends Component {
  componentDidMount = () => document.title = 'Toruń.onthe.bike';

  render(){
    return(
      <section className={styles['map__section']}>
        <MapProvider>
          <MapWrapper className={styles['map__wrapper']}>
            <TileLayer />
          </MapWrapper>
        </MapProvider>
      </section>
    )
  }
}

export default Map;