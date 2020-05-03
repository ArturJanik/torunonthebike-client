import React, { PureComponent } from 'react';
import styles from './MapFilters.module.css';
import { MapConsumer } from '../../../../../context/MapContext';
import FilterOption from './FilterOption/FilterOption';
import FilterButton from './FilterButton/FilterButton';

class MapFilters extends PureComponent {
  state = { showFilters: false }

  filterTypes = [
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
    }
  ]

  showTypes = ({ filterType, setFilterType }) => {
    return this.filterTypes.map(type => {
      const className = (filterType === type.value) ? 'filter__type--selected' : 'filter__type';
      return <li key={ type.value } className={ styles[ className ] } onClick={ () => setFilterType(type.value) }>{ type.text }</li>
    })
  }

  showOptions = ({ filterType, filterOptions, toggleFilterOption }) => {
    return filterOptions.map(opt => (
      <FilterOption key={ filterType+'-'+opt.value }
        clicked={ toggleFilterOption }
        value={ opt.value }
        filterType={ filterType }
        color={ (opt.checked) ? opt.color : 'white' }
        name={ opt.name }
      />
    ))
  }

  toggleFilterVisibility = () => this.setState(prevState => ({ showFilters: !prevState.showFilters }));

  render(){
    const filterClassname = this.state.showFilters ? 'filter--show' : 'filter';
    return(
      <>
        <FilterButton clicked={ this.toggleFilterVisibility } />
        <div className={ styles[ filterClassname ] }>
          <p className={ styles.filter__title }>Rodzaj filtra:</p>
          <MapConsumer>
            {ctx => (
              <>
                <ul className={ styles.filter__types }>
                  {this.showTypes(ctx)}
                </ul>
                {(ctx.filterType !== 'default') && (
                  <React.Fragment>
                    <p className={ styles.filter__title }>Filtruj typ:</p>
                    <div className={ styles.filter__options }>
                      {this.showOptions(ctx)}
                    </div>
                    </React.Fragment>
                )}
              </>
            )}
          </MapConsumer>
        </div>
      </>
    )
  }
}

export default MapFilters;
