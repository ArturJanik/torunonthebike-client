import React, { Component } from 'react';
import styles from './Map.module.css';

import MessagePopup from '../../components/MessagePopup/MessagePopup';
import MapWrapper from './MapWrapper/MapWrapper'
import TileLayer from './Layers/TileLayer/TileLayer'
import RouteLayer from './Layers/RouteLayer/RouteLayer'
import EventLayer from './Layers/EventLayer/EventLayer'
import ControlLayer from './Layers/ControlLayer/ControlLayer'
import AlertLayer from './Layers/AlertLayer/AlertLayer'

import { MapProvider } from '../../context/MapContext';

class Map extends Component {
  state = {
    alertsVisible: false,
  }

  componentDidMount = () => document.title = 'Toruń.onthe.bike';

  toggleAlerts = () => {
    this.setState(prevState => ({alertsVisible: !prevState.alertsVisible}))
  }

  render(){
    return(
      <section className={styles['map__section']}>
        <MapProvider>
          <MapWrapper className={styles['map__wrapper']}>
            <TileLayer />
            <RouteLayer />
            <EventLayer />
            {this.state.alertsVisible ? <AlertLayer /> : null}
          </MapWrapper>
          <ControlLayer toggleAlerts={this.toggleAlerts} />
          <MessagePopup />
        </MapProvider>
      </section>
    )
  }
}

export default Map;