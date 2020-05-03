import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './FilterOption.module.css';

class FilterOption extends PureComponent {
  render(){
    const { filterType, value, color, name } = this.props;
    return (
      <p className={ styles.filter__option } key={ filterType+'-'+value } onClick={ () => this.props.clicked(value) }>
        <span className={ styles.filter__option__box } style={ { background: color } }></span>
        { name }
      </p>
    )
  }
}

FilterOption.propTypes = {
  filterType: PropTypes.string,
  value: PropTypes.number,
  color: PropTypes.string,
  name: PropTypes.string,
  clicked: PropTypes.func
};

export default FilterOption;
