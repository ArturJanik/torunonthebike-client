import React, { Component } from 'react';
import { MapContext } from '../../../../../context/MapContext';
import styles from './ZoomControl.module.css';

class ZoomControl extends Component {
  zoomIn = () => this.context.map.zoomIn();
  
  zoomOut = () => this.context.map.zoomOut();

  render() {
    return (
      <div className={styles['zoom__controls']}>
        <div className={styles['zoom--in']} onClick={this.zoomIn}>+</div>
        <div className={styles['zoom--out']} onClick={this.zoomOut}>-</div>
      </div>
    )
  }
}
ZoomControl.contextType = MapContext;

export default ZoomControl;