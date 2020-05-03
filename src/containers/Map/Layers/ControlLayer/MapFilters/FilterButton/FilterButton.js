import React from 'react';
import PropTypes from 'prop-types';
import styles from './FilterButton.module.css';
import btnBgSrc from '../../../../../../assets/typebtn.png';

const FilterButton = (props) => <div className={ styles.filter__button } onClick={ props.clicked }><img src={ btnBgSrc } alt="Pokaż filtry" /></div>;

FilterButton.propTypes = {
  clicked: PropTypes.func
};

export default FilterButton;
