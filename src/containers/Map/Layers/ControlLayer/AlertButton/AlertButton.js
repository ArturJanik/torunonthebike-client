import React from 'react';
import styles from './AlertButton.module.css';
import btnBg from '../../../../../assets/alertbtn.png';

const AlertButton = (props) => <div className={styles['alert__button']} onClick={props.clicked}><img src={btnBg} alt="Pokaż ostrzeżenia" /></div>;

export default AlertButton;