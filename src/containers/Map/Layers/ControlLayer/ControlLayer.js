import React, { Component } from 'react';
import { MapContext } from '../../../../context/MapContext';

import ZoomControl from './ZoomControl/ZoomControl';

class ControlLayer extends Component {

  render(){
    return(
      <React.Fragment>
        <ZoomControl />
        MapFilters
        MessageButton
        AlertButton
      </React.Fragment>
    )
  }
}
ControlLayer.contextType = MapContext;

export default ControlLayer;