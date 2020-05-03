import React from 'react';
import PropTypes from 'prop-types';
import styles from './AlertButton.module.css';
import btnBgSrc from '../../../../../assets/alertbtn.png';

const AlertButton = (props) => <div className={ styles.alert__button } onClick={ props.clicked }><img src={ btnBgSrc } alt="Pokaż ostrzeżenia" /></div>;

AlertButton.propTypes = {
  clicked: PropTypes.func
};

export default AlertButton;
