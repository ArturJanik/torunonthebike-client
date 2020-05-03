import React from 'react';
import PropTypes from 'prop-types';
import styles from './CitybikeButton.module.css';
import btnBgSrc from '../../../../../assets/trm.png';

const CitybikeButton = (props) => <div className={ styles.button } onClick={ props.clicked }><img className={ styles.image } src={ btnBgSrc } alt="Pokaż stacje Torvelo" /></div>;

CitybikeButton.propTypes = {
  clicked: PropTypes.func
};

export default CitybikeButton;
