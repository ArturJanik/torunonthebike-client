import { Button } from 'components/UI/Button/Button';
import styles from './FilterButton.module.css';
import btnBgSrc from 'assets/typebtn.png';

interface FilterButtonProps {
    onClick: () => void;
}

export const FilterButton = ({ onClick }: FilterButtonProps): JSX.Element => {
    return (
        <Button onClick={onClick} className={styles.button}>
            <img className={styles.image} src={btnBgSrc} alt="Pokaż filtry" />
        </Button>
    );
};
