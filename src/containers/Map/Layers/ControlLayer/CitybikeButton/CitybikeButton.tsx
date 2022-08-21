import styles from './CitybikeButton.module.css';
import btnBgSrc from 'assets/trm.png';
import { Button } from 'components/UI/Button/Button';

interface CitybikeButton {
  onClick: () => void;
}

export const CitybikeButton = ({ onClick }: CitybikeButton): JSX.Element => {
  return (
    <Button onClick={ onClick } className={styles.button}>
      <img className={ styles.image } src={ btnBgSrc } alt="Pokaż stacje Torvelo" />
    </Button>
  );
}
