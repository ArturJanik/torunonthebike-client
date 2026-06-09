import { isDev } from 'utilities/isDev';
import { BikeLane, RawBikeLane, RoutesServerResponse } from '../types/bikelane';

const BACKEND_SERVER = 'http://57.128.198.186:3333';
const endpointHost = isDev() ? 'http://localhost:3001' : BACKEND_SERVER;
const FETCH_ROUTES_ENDPOINT = `${endpointHost}/api/bikelanes`;
const LAST_MODIFICATION_ENDPOINT = `${endpointHost}/api/bikelanes/last_modification`;
const LOCAL_STORAGE_ROUTES = 'routesData';
const LOCAL_STORAGE_ROUTES_LAST_CHANGE = 'routesLastChange';

export const getRoutesData = async (): Promise<BikeLane[]> => {
    let routesData: BikeLane[] = [];
    routesData = getRoutesFromLocalStorage();

    if (routesData.length > 0) {
        const isUpToDate = await validateIfRouteDataIsUpToDate();
        
        if (!isUpToDate) {
            routesData = await fetchData();
        }
    } else {
        routesData = await fetchData();
    }

    return routesData;
};

const fetchData = async (): Promise<BikeLane[]> => {
    clearLocalStorage();
    const [routes, info] = await getRoutesFromServer();
    const parsedRoutes = routesMapper(routes);
    const lastModificationDate = info.last_changed_at;

    localStorage.setItem(LOCAL_STORAGE_ROUTES, JSON.stringify({ type: 'FeatureCollection', features: parsedRoutes }));
    localStorage.setItem(LOCAL_STORAGE_ROUTES_LAST_CHANGE, lastModificationDate);

    return parsedRoutes;
}

const getRoutesFromLocalStorage = (): BikeLane[] => {
    const routesData = localStorage.getItem(LOCAL_STORAGE_ROUTES);

    if (routesData === null) {
        return [];
    }

    const parsedData = JSON.parse(routesData);

    if (parsedData.type !== 'FeatureCollection' || !Array.isArray(parsedData.features)) {
        return [];
    }

    return parsedData.features;
};

const validateIfRouteDataIsUpToDate = async (): Promise<boolean> => {
    const onlineLastModificationDate = await getLastModificationDate();
    const localLastModificationDate = localStorage.getItem(LOCAL_STORAGE_ROUTES_LAST_CHANGE);

    if (!onlineLastModificationDate || localLastModificationDate === null) {
        return false;
    }

    const changedAtOnline = new Date(onlineLastModificationDate);
    const changedAtLocal = new Date(localLastModificationDate);
    const localDataOutOfDate = changedAtOnline > changedAtLocal;

    if (localDataOutOfDate) {
        return false;
    }

    return true;
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

const getLastModificationDate = (): Promise<string | undefined> => {
    return fetch(LAST_MODIFICATION_ENDPOINT)
        .then(res => res.json())
        .then(res => res.last_changed_at);
};

const getRoutesFromServer = (): Promise<RoutesServerResponse> => {
    return fetch(FETCH_ROUTES_ENDPOINT)
        .then(res => res.json());
};

const clearLocalStorage = (): void => {
    localStorage.removeItem(LOCAL_STORAGE_ROUTES);
    localStorage.removeItem(LOCAL_STORAGE_ROUTES_LAST_CHANGE);
};
