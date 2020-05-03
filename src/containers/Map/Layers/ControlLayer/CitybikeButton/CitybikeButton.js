import React from 'react';
import PropTypes from 'prop-types';
import styles from './CitybikeButton.module.css';
import btnBgSrc from '../../../../../assets/trm.png';

const CitybikeButton = (props) => <div className={ styles.citybike__button } onClick={ props.clicked }><img src={ btnBgSrc } alt="Pokaż stacje Torvelo" /></div>;

CitybikeButton.propTypes = {
  clicked: PropTypes.func
};

export default CitybikeButton;
