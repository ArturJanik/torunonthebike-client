import { useState, createContext } from 'react';
import * as L from 'leaflet';

export type FilterType = 'type' | 'surface' | 'quality' | 'default';
export type OptionValue = number;

interface FilterOptions {
  value: OptionValue;
  name: string;
  color: string;
  checked: boolean;
}

interface MapContextState {
  map: L.Map | null;
  filterType: FilterType;
  filterOptions: FilterOptions[];
}

interface MapContextInterface {
  state: MapContextState,
  setMap: (mapObj: any) => void;
  setFilterType: (type: FilterType) => void;
  toggleFilterOption: (optionValue: OptionValue) => void;
}

interface MapProviderProps {
  children: JSX.Element[] | JSX.Element;
}

const initialState: MapContextState = {
  map: null,
  filterType: 'default',
  filterOptions: [],
};

export const MapContext = createContext<MapContextInterface>({
  state: initialState,
  setMap: () => {},
  setFilterType: () => {},
  toggleFilterOption: () => {},
});
export const MapConsumer = MapContext.Consumer;

export const MapContextProvider = ({ children }: MapProviderProps) => {
  const [state, setState] = useState<MapContextState>(initialState);

  const setMap = (mapObj: any): void => {
    if(state.map === null) {
      setState((prevState) => ({
        ...prevState,
        map: mapObj,
      }));
    }
  }

  const setFilterType = (filterType: FilterType): void => {
    if(state.filterType !== filterType){
      const filterOptions = getDefaultFilterOptions(filterType);

      setState((prevState) => ({
        ...prevState,
        filterType,
        filterOptions,
      }));
    }
  }
  
  const getDefaultFilterOptions = (filterType: FilterType): FilterOptions[] => {
    let opt: FilterOptions[] = [];

    switch (filterType) {
      case 'type':
        opt = [
          { value: 0, name: 'Droga dla rowerów', color: '#333', checked: true },
          { value: 1, name: 'Droga dla rowerów i pieszych', color: '#c12121', checked: true },
          { value: 2, name: 'Kontrapas rowerowy', color: '#2151c1', checked: true },
          { value: 3, name: 'Pas rowerowy', color: '#9eae0e', checked: true },
          { value: 4, name: 'Chodnik z dopuszczonym ruchem rowerów', color: '#efaf00', checked: true },
          // { value: 5, name: 'Jezdnia z kontraruchem', color: 'pink', checked: true },
          { value: 9, name: 'Przejazd rowerowy', color: '#666', checked: true },
        ]
        return opt;
      case 'surface':
        opt = [
          { value: 0, name: 'Asfalt', color: '#333', checked: true },
          { value: 1, name: 'Kostka bauma (fazowana)', color: '#c12121', checked: true },
          { value: 7, name: 'Kostka bauma (niefaz.)', color: '#8f3dc6', checked: true },
          { value: 2, name: 'Płyta chodnikowa mała', color: '#fc4a1a', checked: true },
          { value: 3, name: 'Płyta chodnikowa duża', color: '#86c232', checked: true },
          { value: 4, name: 'Utwardzona naturalna', color: '#43631a', checked: true },
          { value: 5, name: 'Luźna (Szuter/Piach)', color: '#fcc204', checked: true },
          { value: 6, name: 'Inna', color: '#1cb571', checked: true },
        ]
        return opt;
      case 'quality':
        opt = [
          { value: 0, name: 'Brak informacji', color: '#333', checked: true },
          { value: 1, name: 'Nieprzejezdna', color: '#c12121', checked: true },
          { value: 2, name: 'Popękana/zniszczona', color: '#fc4a1a', checked: true },
          { value: 3, name: 'Miejscowe uszkodzenia', color: '#fcc204', checked: true },
          { value: 4, name: 'Drobne ubytki', color: '#86c232', checked: true },
          { value: 5, name: 'Idealna', color: '#43631a', checked: true },
        ]
        return opt;
      default:
        return opt;
    }
  }

  const toggleFilterOption = (optionValue: OptionValue): void => {
    const modifiedOptions: FilterOptions[] = state.filterOptions.map(opt => (opt.value === optionValue) ? { ...opt, checked: !opt.checked } : opt);
    setState((prevState) => ({
      ...prevState,
      filterOptions: modifiedOptions,
    }));
  }

  return (
    <MapContext.Provider value={ { state, setMap, setFilterType, toggleFilterOption } }>
      { children }
    </MapContext.Provider>
  )
}
