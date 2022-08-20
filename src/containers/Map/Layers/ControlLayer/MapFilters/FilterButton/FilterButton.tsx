import styles from './FilterButton.module.css';
import btnBgSrc from 'assets/typebtn.png';

interface FilterButtonProps {
    onClick: () => void;
}

export const FilterButton = ({ onClick }: FilterButtonProps): JSX.Element => {
    return (
        <div className={ styles.button } onClick={ onClick }>
            <img src={ btnBgSrc } className={ styles.image } alt="Pokaż filtry" />
        </div>
    );
};
