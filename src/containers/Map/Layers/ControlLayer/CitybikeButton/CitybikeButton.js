import React from 'react';
import styles from './CitybikeButton.module.css';
import btnBg from '../../../../../assets/trm.png';

const CitybikeButton = (props) => <div className={styles['citybike__button']} onClick={props.clicked}><img src={btnBg} alt="Pokaż stacje Torvelo" /></div>;

export default CitybikeButton;