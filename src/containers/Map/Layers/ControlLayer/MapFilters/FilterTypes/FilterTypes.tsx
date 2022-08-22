import { useContext } from "react";
import { FilterType, MapContext } from 'context/MapContext';
import styles from './FilterTypes.module.css';

interface FilterTypeDescription {
  value: FilterType;
  text: string;
}

const filterTypeDescriptions: FilterTypeDescription[] = [
  {
    value: 'default',
    text: 'Brak (domyślny)'
  },{
    value: 'type',
    text: 'Typ drogi'
  },{
    value: 'surface',
    text: 'Dominująca nawierzchnia'
  },{
    value: 'quality',
    text: 'Jakość nawierzchni'
  },
];

export const FilterTypes = (): JSX.Element => {
    const mapCtx = useContext(MapContext);

    const showTypes = (): JSX.Element[] => {
        const { filterType } = mapCtx.state;
        const { setFilterType } = mapCtx;
    
        return filterTypeDescriptions.map((type) => {
            const classNames = `${ styles.filterType } ${filterType === type.value ? styles.selected : ''}`;

            return (
                <li key={ type.value } className={ classNames } onClick={ () => setFilterType(type.value) }>
                    { type.text }
                </li>
            );
        });
    };

    return (
        <>
            <p className={ styles.filterTitle }>Rodzaj filtra:</p>
            <ul className={ styles.filterTypes }>
                {showTypes()}
            </ul>
        </>
    );
};
