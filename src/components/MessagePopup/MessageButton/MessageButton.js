import React from 'react';
import PropTypes from 'prop-types';
import styles from './MessageButton.module.css';
import btnBgSrc from '../../../assets/msgbtn.png';

const MessageButton = (props) => <div className={ styles.button } onClick={ props.clicked }><img src={ btnBgSrc } className={ styles.image } alt="Zgłoś uwagi" /></div>;

MessageButton.propTypes = {
  clicked: PropTypes.func
};

export default MessageButton;
