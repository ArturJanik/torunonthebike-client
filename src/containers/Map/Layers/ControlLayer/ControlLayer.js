import React from 'react';
import PropTypes from 'prop-types';

import ZoomControl from './ZoomControl/ZoomControl';
import MapFilters from './MapFilters/MapFilters';
import CitybikeButton from './CitybikeButton/CitybikeButton';

const ControlLayer = (props) => (
  <React.Fragment>
    <ZoomControl />
    <MapFilters />
    <CitybikeButton clicked={ props.toggleCitybikes } />
  </React.Fragment>
);

ControlLayer.propTypes = {
  toggleCitybikes: PropTypes.func
};

export default ControlLayer;
