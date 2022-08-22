import { useContext, useState } from 'react';
import { MapContext } from 'context/MapContext';
import { FilterOptions } from './FilterOptions/FilterOptions';
import { FilterTypes } from './FilterTypes/FilterTypes';
import { FilterButton } from './FilterButton/FilterButton';
import styles from './MapFilters.module.css';

export const MapFilters = (): JSX.Element => {
  const mapCtx = useContext(MapContext);

  const [filtersVisible, setFiltersVisible] = useState(false);

  const toggleFilterVisibility = (): void => {
    setFiltersVisible(prevState => !prevState);
  };

  const filtersClassname = filtersVisible ? styles.filterVisible : styles.filter;
  const isSpecificFilterTypeSelected = mapCtx.state.filterType !== 'default';

  return(
    <>
      <FilterButton onClick={ toggleFilterVisibility } />
      <div className={ filtersClassname }>
        <FilterTypes />
        {isSpecificFilterTypeSelected && <FilterOptions />}
      </div>
    </>
  );
};
