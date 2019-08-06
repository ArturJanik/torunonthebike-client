import React from 'react';
import styles from './FilterButton.module.css';
import btnBg from '../../../../../../assets/typebtn.png';

const FilterButton = (props) => <div className={styles['filter__button']} onClick={props.clicked}><img src={btnBg} alt="Pokaż filtry" /></div>;

export default FilterButton;