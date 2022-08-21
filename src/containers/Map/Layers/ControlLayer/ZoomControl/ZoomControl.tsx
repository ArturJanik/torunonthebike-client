import { useContext } from 'react';
import { MapContext } from 'context/MapContext';
import { Button } from 'components/UI/Button/Button';
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
      <Button onClick={ zoomIn } className={styles.zoomInBtn}>
        <span>+</span>
      </Button>
      <Button onClick={ zoomOut } className={styles.zoomOutBtn}>
        <span>-</span>
      </Button>
    </div>
  )
}

export default ZoomControl;
