import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './FilterOption.module.css';

class FilterOption extends PureComponent {
  render(){
    const { filterType, value, color, name, clicked } = this.props;
    return (
      <p className={ styles.filterOption } key={ filterType+'-'+value } onClick={ () => clicked(value) }>
        <span className={ styles.filterOptionBox } style={ { background: color } }></span>
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
