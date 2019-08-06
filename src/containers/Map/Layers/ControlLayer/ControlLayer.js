import React, { Component } from 'react';
import { MapContext } from '../../../../context/MapContext';

import ZoomControl from './ZoomControl/ZoomControl';
import MapFilters from './MapFilters/MapFilters';

class ControlLayer extends Component {
  render(){
    return(
      <React.Fragment>
        <ZoomControl />
        <MapFilters />
        AlertButton
      </React.Fragment>
    )
  }
}
ControlLayer.contextType = MapContext;

export default ControlLayer;