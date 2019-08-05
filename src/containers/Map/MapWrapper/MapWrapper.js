import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { MapContext, MapConsumer } from '../../../context/MapContext';

class MapWrapper extends Component {
  componentDidMount(){
    const ctx = this.context;
    if(ctx.map === null){
      const mapOptions = {
        center: [53.025, 18.62],
        zoom: 14,
        zoomControl: false
      }
      const map = L.map('map', mapOptions);
      ctx.setMap(map);
    }
  }

  render(){
    return (
      <MapConsumer>
        {ctx => (
          <div id="map" {...this.props}>{(ctx.map !== null) ? this.props.children : null}</div>
        )}
      </MapConsumer>
    );
  }
}
MapWrapper.contextType = MapContext;

export default MapWrapper;