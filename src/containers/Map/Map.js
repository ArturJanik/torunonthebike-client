import React, { Component } from 'react';
import styles from './Map.module.css';

import MapWrapper from './MapWrapper/MapWrapper';
import TileLayer from './Layers/TileLayer/TileLayer';
import RouteLayer from './Layers/RouteLayer/RouteLayer';
import EventLayer from './Layers/EventLayer/EventLayer';
import ControlLayer from './Layers/ControlLayer/ControlLayer';
import CitybikeLayer from './Layers/CitybikeLayer/CitybikeLayer';

import { MapProvider } from '../../context/MapContext';

class Map extends Component {
  state = {
    citybikesVisible: false
  }

  toggleCitybikes = () => {
    this.setState(prevState => ({ citybikesVisible: !prevState.citybikesVisible }));
  }

  render(){
    document.title = 'Interaktywna mapa rowerowa Torunia - Toruń.onthe.bike';
    return(
      <section className={ styles.mapSection }>
        <MapProvider>
          <MapWrapper className={ styles.mapWrapper }>
            <TileLayer />
            <RouteLayer />
            <EventLayer />
            { this.state.citybikesVisible && <CitybikeLayer /> }
          </MapWrapper>
          <ControlLayer toggleCitybikes={ this.toggleCitybikes } />
        </MapProvider>
      </section>
    )
  }
}

export default Map;
