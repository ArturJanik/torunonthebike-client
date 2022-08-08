import React, { Component } from 'react';
import styles from './Map.module.css';

// import MessagePopup from '../../components/MessagePopup/MessagePopup';
import MapWrapper from './MapWrapper/MapWrapper'
import TileLayer from './Layers/TileLayer/TileLayer'
import RouteLayer from './Layers/RouteLayer/RouteLayer'
import EventLayer from './Layers/EventLayer/EventLayer'
import ControlLayer from './Layers/ControlLayer/ControlLayer'
import AlertLayer from './Layers/AlertLayer/AlertLayer'
import CitybikeLayer from './Layers/CitybikeLayer/CitybikeLayer'

import { MapProvider } from '../../context/MapContext';

class Map extends Component {
  state = {
    alertsVisible: false,
    citybikesVisible: false
  }

  toggleAlerts = () => {
    this.setState(prevState => ({ alertsVisible: !prevState.alertsVisible }));
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
            { this.state.alertsVisible && <AlertLayer /> }
            { this.state.citybikesVisible && <CitybikeLayer /> }
          </MapWrapper>
          <ControlLayer toggleAlerts={ this.toggleAlerts } toggleCitybikes={ this.toggleCitybikes } />
          {/* <MessagePopup /> */}
        </MapProvider>
      </section>
    )
  }
}

export default Map;
