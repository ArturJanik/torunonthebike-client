import React from 'react';
import PropTypes from 'prop-types';
import styles from './AlertButton.module.css';
import btnBgSrc from '../../../../../assets/alertbtn.png';

const AlertButton = (props) => <div className={ styles.button } onClick={ props.clicked }><img src={ btnBgSrc } className={ styles.image } alt="Pokaż ostrzeżenia" /></div>;

AlertButton.propTypes = {
  clicked: PropTypes.func
};

export default AlertButton;
