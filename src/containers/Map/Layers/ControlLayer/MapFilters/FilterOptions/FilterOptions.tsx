import { useContext } from "react";
import { FilterOption } from "../FilterOption/FilterOption";
import { MapContext } from 'context/MapContext';
import styles from './FilterOptions.module.css';

export const FilterOptions = (): JSX.Element => {
    const mapCtx = useContext(MapContext);

    const showOptions = (): JSX.Element[] => {
        const { filterType, filterOptions } = mapCtx.state;
        const { toggleFilterOption } = mapCtx;
    
        return filterOptions.map(opt => (
            <FilterOption key={ filterType + '-' + opt.value }
                onClick={ toggleFilterOption }
                value={ opt.value }
                filterType={ filterType }
                color={ (opt.checked) ? opt.color : 'white' }
                name={ opt.name }
            />
        ))
    };

    return (
        <>
            <p className={ styles.filterTitle }>Filtruj typ:</p>
            <div className={ styles.filterOptions }>
                {showOptions()}
            </div>
        </>
    );
};
