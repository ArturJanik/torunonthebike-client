import React, { Component } from 'react';
import styles from './FilterOption.module.css';

class FilterOption extends Component {
  shouldComponentUpdate = (nextProps) => nextProps.color !== this.props.color;
  render(){
    const {filterType, value, color, name} = this.props;
    return (
      <p className={styles['filter__option']} key={filterType+'-'+value} onClick={() => this.props.clicked(value)}>
        <span className={styles['filter__option__box']} style={{background: color}}></span>
        {name}
      </p>
    )
  }
}

export default FilterOption;