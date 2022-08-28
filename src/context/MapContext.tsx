import { useState, createContext } from 'react';
import * as L from 'leaflet';
import { getFilterOptions } from 'context/getFilterOptions';

export type FilterType = 'type' | 'surface' | 'quality' | 'default';
export type OptionValue = number;

export interface FilterOption {
  value: OptionValue;
  name: string;
  color: string;
  checked: boolean;
}

interface MapContextState {
    map: L.Map | null;
    filterType: FilterType;
    filterOptions: FilterOption[];
}

interface MapContextInterface {
    state: MapContextState;
    setMap: (mapObj: any) => void;
    setFilterType: (type: FilterType) => void;
    toggleFilterOption: (optionValue: OptionValue) => void;
}

interface MapContextProviderProps {
    children: JSX.Element[] | JSX.Element;
}

const initialState: MapContextState = {
    map: null,
    filterType: 'default',
    filterOptions: [],
};

const initialContext: MapContextInterface = {
    state: initialState,
    setMap: () => {},
    setFilterType: () => {},
    toggleFilterOption: () => {},
};

export const MapContext = createContext<MapContextInterface>(initialContext);

export const MapContextProvider = ({ children }: MapContextProviderProps) => {
    const [state, setState] = useState<MapContextState>(initialState);

    const setMap = (map: L.Map): void => {
        setState((prevState) => ({
            ...prevState,
            map,
        }));
    };

    const setFilterType = (filterType: FilterType): void => {
        if (state.filterType !== filterType) {
            const filterOptions = getFilterOptions(filterType);

            setState((prevState) => ({
                ...prevState,
                filterType,
                filterOptions,
            }));
        }
    };

    const mapAsSelected = (option: FilterOption, selectedOption: OptionValue): FilterOption => {
        if (option.value === selectedOption) {
            return {
                ...option,
                checked: !option.checked,
            };
        }

        return option;
    };

    const toggleFilterOption = (optionValue: OptionValue): void => {
        const updatedOptions: FilterOption[] = state.filterOptions
            .map(opt => mapAsSelected(opt, optionValue));

        setState((prevState) => ({
            ...prevState,
            filterOptions: updatedOptions,
        }));
    };

    const providerState = {
        state,
        setMap,
        setFilterType,
        toggleFilterOption,
    };

    return (
        <MapContext.Provider value={providerState}>
            {children}
        </MapContext.Provider>
    );
};
