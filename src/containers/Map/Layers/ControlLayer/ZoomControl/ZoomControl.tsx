import { useContext } from 'react';
import { MapContext } from '../../../../../context/MapContext';
import styles from './ZoomControl.module.css';

const ZoomControl = (): JSX.Element => {
  const mapCtx = useContext(MapContext);
  const { map } = mapCtx.state;

  const zoomIn = (): void => {
    if (map !== null) {
      map.zoomIn();
    }
  };
  
  const zoomOut = (): void => {
    if (map !== null) {
      map.zoomOut();
    }
  };

  return (
    <div className={ styles.buttons }>
      <div className={ styles.zoomIn } onClick={ zoomIn }><span>+</span></div>
      <div className={ styles.button } onClick={ zoomOut }><span>-</span></div>
    </div>
  )
}

export default ZoomControl;
