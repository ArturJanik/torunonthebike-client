import React, { Component } from 'react';
import { MapContext } from '../../../../../context/MapContext';
import styles from './ZoomControl.module.css';

class ZoomControl extends Component {
  zoomIn = () => this.context.map.zoomIn();
  
  zoomOut = () => this.context.map.zoomOut();

  render() {
    return (
      <div className={ styles.buttons }>
        <div className={ styles.zoomIn } onClick={ this.zoomIn }><span>+</span></div>
        <div className={ styles.button } onClick={ this.zoomOut }><span>-</span></div>
      </div>
    )
  }
}
ZoomControl.contextType = MapContext;

export default ZoomControl;
