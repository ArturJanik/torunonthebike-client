import React from 'react';

import ZoomControl from './ZoomControl/ZoomControl';
import MapFilters from './MapFilters/MapFilters';
import AlertButton from './AlertButton/AlertButton';

const ControlLayer = (props) => (
  <React.Fragment>
    <ZoomControl />
    <MapFilters />
    <AlertButton clicked={props.toggleAlerts} />
  </React.Fragment>
)

export default ControlLayer;