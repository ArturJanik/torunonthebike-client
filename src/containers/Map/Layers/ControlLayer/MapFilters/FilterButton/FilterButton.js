import React from 'react';
import PropTypes from 'prop-types';
import styles from './FilterButton.module.css';
import btnBgSrc from '../../../../../../assets/typebtn.png';

const FilterButton = (props) => <div className={ styles.button } onClick={ props.clicked }><img src={ btnBgSrc } className={ styles.image } alt="Pokaż filtry" /></div>;

FilterButton.propTypes = {
  clicked: PropTypes.func
};

export default FilterButton;
