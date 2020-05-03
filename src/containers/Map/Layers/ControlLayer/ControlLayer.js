import React from 'react';
import PropTypes from 'prop-types';

import ZoomControl from './ZoomControl/ZoomControl';
import MapFilters from './MapFilters/MapFilters';
import AlertButton from './AlertButton/AlertButton';
import CitybikeButton from './CitybikeButton/CitybikeButton';

const ControlLayer = (props) => (
  <React.Fragment>
    <ZoomControl />
    <MapFilters />
    <AlertButton clicked={ props.toggleAlerts } />
    <CitybikeButton clicked={ props.toggleCitybikes } />
  </React.Fragment>
);

ControlLayer.propTypes = {
  toggleAlerts: PropTypes.func,
  toggleCitybikes: PropTypes.func
};

export default ControlLayer;
