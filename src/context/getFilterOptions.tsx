import { FilterType, FilterOption } from 'context/MapContext';

const getBikelaneTypeOptions = (): FilterOption[] => {
    return ([
        { value: 0, name: 'Droga dla rowerów', color: '#333', checked: true },
        { value: 1, name: 'Droga dla rowerów i pieszych', color: '#c12121', checked: true },
        { value: 2, name: 'Kontrapas rowerowy', color: '#2151c1', checked: true },
        { value: 3, name: 'Pas rowerowy', color: '#9eae0e', checked: true },
        { value: 4, name: 'Chodnik z dopuszczonym ruchem rowerów', color: '#efaf00', checked: true },
        // { value: 5, name: 'Jezdnia z kontraruchem', color: 'pink', checked: true },
        { value: 9, name: 'Przejazd rowerowy', color: '#666', checked: true },
    ]);
};

const getBikelaneSurfaceOptions = (): FilterOption[] => {
    return ([
        { value: 0, name: 'Asfalt', color: '#333', checked: true },
        { value: 1, name: 'Kostka bauma (fazowana)', color: '#c12121', checked: true },
        { value: 7, name: 'Kostka bauma (niefaz.)', color: '#8f3dc6', checked: true },
        { value: 2, name: 'Płyta chodnikowa mała', color: '#fc4a1a', checked: true },
        { value: 3, name: 'Płyta chodnikowa duża', color: '#86c232', checked: true },
        { value: 4, name: 'Utwardzona naturalna', color: '#43631a', checked: true },
        { value: 5, name: 'Luźna (Szuter/Piach)', color: '#fcc204', checked: true },
        { value: 6, name: 'Inna', color: '#1cb571', checked: true },
    ]);
};

const getBikelaneQualityOptions = (): FilterOption[] => {
    return ([
        { value: 0, name: 'Brak informacji', color: '#333', checked: true },
        { value: 1, name: 'Nieprzejezdna', color: '#c12121', checked: true },
        { value: 2, name: 'Popękana/zniszczona', color: '#fc4a1a', checked: true },
        { value: 3, name: 'Miejscowe uszkodzenia', color: '#fcc204', checked: true },
        { value: 4, name: 'Drobne ubytki', color: '#86c232', checked: true },
        { value: 5, name: 'Idealna', color: '#43631a', checked: true },
    ]);
};

export const getFilterOptions = (filterType: FilterType): FilterOption[] => {
    switch (filterType) {
        case 'type':
            return getBikelaneTypeOptions();
        case 'surface':
            return getBikelaneSurfaceOptions();
        case 'quality':
            return getBikelaneQualityOptions();
        default:
            return [];
    }
};
