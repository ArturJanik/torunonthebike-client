import { useContext, useState } from 'react';
import { FilterType, MapContext } from 'context/MapContext';
import { FilterOption } from './FilterOption/FilterOption';
import { FilterButton } from './FilterButton/FilterButton';
import styles from './MapFilters.module.css';

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

export const MapFilters = (): JSX.Element => {
  const mapCtx = useContext(MapContext);

  const [filtersVisible, setFiltersVisible] = useState(false);

  const showTypes = (): JSX.Element[] => {
    const { filterType } = mapCtx.state;
    const { setFilterType } = mapCtx;

    return filterTypeDescriptions.map((type) => {
      const classNames = `${ styles.filterType } ${ (filterType === type.value ? styles.selected : '') }`;
      return (
        <li key={ type.value } className={ classNames } onClick={ () => setFilterType(type.value) }>
          { type.text }
        </li>
      )
    })
  };

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

  const toggleFilterVisibility = (): void => {
    setFiltersVisible(prevState => !prevState);
  };

  const filtersClassname = filtersVisible ? styles.filterVisible : styles.filter;
  return(
    <>
      <FilterButton onClick={ toggleFilterVisibility } />
      <div className={ filtersClassname }>
        <p className={ styles.filterTitle }>Rodzaj filtra:</p>
          <ul className={ styles.filterTypes }>
            {showTypes()}
          </ul>
          {(mapCtx.state.filterType !== 'default') && (
            <>
              <p className={ styles.filterTitle }>Filtruj typ:</p>
              <div className={ styles.filterOptions }>
                {showOptions()}
              </div>
            </>
          )}
      </div>
    </>
  )
}
