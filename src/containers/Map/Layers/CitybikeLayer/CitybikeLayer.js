import React, { Component } from 'react';
import L from 'leaflet';
import { MapContext } from '../../../../context/MapContext';
import styles from './CitybikeLayer.module.css';

class CitybikeLayer extends Component {
  state = {
    stations: null,
    stationsData: null,
    stationsLoading: false,
    stationsError: null
  }

  componentDidMount(){
    
  }

  render = () => <div>CitybikeLayer</div>;
}
CitybikeLayer.contextType = MapContext;

export default CitybikeLayer;