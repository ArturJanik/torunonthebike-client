import React, { Component } from 'react';
import styles from './Map.module.css';

import MessagePopup from '../../components/MessagePopup/MessagePopup';
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

  componentDidMount = () => document.title = 'Toruń.onthe.bike';

  toggleAlerts = () => {
    this.setState(prevState => ({alertsVisible: !prevState.alertsVisible}))
  }

  toggleCitybikes = () => {
    this.setState(prevState => ({citybikesVisible: !prevState.citybikesVisible}))
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
            {this.state.citybikesVisible ? <CitybikeLayer /> : null}
          </MapWrapper>
          <ControlLayer toggleAlerts={this.toggleAlerts} toggleCitybikes={this.toggleCitybikes} />
          <MessagePopup />
        </MapProvider>
      </section>
    )
  }
}

export default Map;