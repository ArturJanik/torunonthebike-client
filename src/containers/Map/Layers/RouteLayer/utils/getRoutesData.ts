import { isDev } from 'utilities/isDev';
import { BikeLane, RawBikeLane } from '../types/bikelane';

const endpointHost = isDev() ? 'http://localhost:3001' : 'https://api.onthe.bike';
const FETCH_ROUTES_ENDPOINT = `${endpointHost}/api/bikelanes`;
const LAST_MODIFICATION_ENDPOINT = `${endpointHost}/api/bikelanes/last_modification`;

export const getRoutesData = async (): Promise<BikeLane[]> => {
    let routesData: BikeLane[] = [];
    routesData = getRoutesFromLocalStorage();

    if (routesData !== []) {
        const isUpToDate = await validateIfRouteDataIsUpToDate();
        
        if (!isUpToDate) {
            const refreshedData = await refreshData();
            routesData = refreshedData;
        }
    }

    return Promise.resolve(routesData);
};

const refreshData = async (): Promise<BikeLane[]> => {
    clearLocalStorage();
    const [routes, info] = await getRoutesFromServer();
    const parsedRoutes = routesMapper(routes);
    const lastModificationDate = info.last_changed_at;

    localStorage.setItem('routesData', JSON.stringify({ type: 'FeatureCollection', features: parsedRoutes }));
    localStorage.setItem('routesLastChange', lastModificationDate);

    return Promise.resolve(parsedRoutes);
}

const getRoutesFromLocalStorage = (): BikeLane[] => {
    const routesData = localStorage.getItem('routesData');

    if (routesData === null) {
        return [];
    }

    return JSON.parse(routesData).features;
};

const validateIfRouteDataIsUpToDate = async (): Promise<boolean> => {
    const onlineLastModificationDate = await getLastModificationDate();
    const localLastModificationDate = localStorage.getItem('routesLastChange');

    if (onlineLastModificationDate === null || localLastModificationDate === null) {
        return Promise.resolve(false);
    }

    const changedAtOnline = new Date(onlineLastModificationDate);
    const changedAtLocal = new Date(localLastModificationDate);
    const localDataOutOfDate = changedAtOnline > changedAtLocal;

    if (localDataOutOfDate) {
        return Promise.resolve(false);
    }

    return Promise.resolve(true);
};

const routesMapper = (bikelanesData: RawBikeLane[]): BikeLane[] => {
    return bikelanesData.map((bikelane) => ({
        type: 'Feature',
        properties: {
            street: bikelane.street,
            roadlane: bikelane.roadlane,
            nameFrom: bikelane.name_from,
            nameTo: bikelane.name_to,
            type: bikelane.type,
            surface: bikelane.surface,
            quality: bikelane.quality
        },
        geometry: {
            type: 'LineString',
            coordinates: JSON.parse(bikelane.points)
        }
    }));
};

const getLastModificationDate = (): Promise<string | null> => {
    return fetch(LAST_MODIFICATION_ENDPOINT)
        .then(res => res.json())
        .then(res => res.last_changed_at);
};

const getRoutesFromServer = (): Promise<any> => {
    return fetch(FETCH_ROUTES_ENDPOINT)
        .then(res => res.json());
};

const clearLocalStorage = (): void => {
    localStorage.removeItem('routesData');
    localStorage.removeItem('routesLastChange');
};
