import styles from './CitybikeButton.module.css';
import btnBgSrc from 'assets/trm.png';

interface CitybikeButton {
  onClick: () => void;
}

export const CitybikeButton = ({ onClick }: CitybikeButton): JSX.Element => {
  return (
    <div className={ styles.button } onClick={ onClick }>
      <img className={ styles.image } src={ btnBgSrc } alt="Pokaż stacje Torvelo" />
    </div>
  );
}
