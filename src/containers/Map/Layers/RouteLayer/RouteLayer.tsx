import { useContext, useEffect, useState } from 'react';
import GeoJSON from './GeoJSON/GeoJSON';
import { MapContext } from 'context/MapContext';
import { isDev } from 'utilities/isEnv';

interface BikeLane {
  id: number;
  street: string;
  roadlane: 'south' | 'north' | 'east' | 'west';
  name_from: string;
  name_to: string;
  points: string;
  type: number;
  surface: number;
  quality: number;
  visible: number;
  created_at: string;
  updated_at?: string;
}

interface ParsedBikeLane {
  type: 'Feature';
  properties: {
    street: string;
    roadlane: 'south' | 'north' | 'east' | 'west';
    nameFrom: string;
    nameTo: string;
    type: number;
    surface: number;
    quality: number;
  },
  geometry: {
    type: 'LineString';
    coordinates: [number, number][];
  }
}

export interface Routes {
  type: 'FeatureCollection';
  features: ParsedBikeLane[];
}

export interface RouteOptions {
  color?: string;
  weight: string;
  opacity: string;
  bubblingMouseEvents: boolean;
  onEachFeature: (feature: any, layer: L.Path) => void;
}

const LAST_MODIFICATION_ENDPOINT_DEV = 'http://localhost:3001/api/bikelanes/last_modification';
const LAST_MODIFICATION_ENDPOINT_PROD = 'https://api.onthe.bike/api/bikelanes/last_modification';

export const RouteLayer = () => {
  const mapCtx = useContext(MapContext);

  const [routes, setRoutes] = useState<Routes | null>(null);

  useEffect(() => {
    if (navigator.onLine){
      const routesData = localStorage.getItem('routesData');
      if (routesData !== null) {
        const url = (isDev()) ? LAST_MODIFICATION_ENDPOINT_DEV : LAST_MODIFICATION_ENDPOINT_PROD;
        fetch(url)
        .then(res => res.json())
        .then(res => {
          const lastChangedAt = res.last_changed_at;
          const lastChange = (lastChangedAt !== null) ? new Date(lastChangedAt) : null;
          const storedLastChange = localStorage.getItem('routesLastChange');
          const lastChangeLocal = (storedLastChange !== null) ? new Date(storedLastChange) : null;
          const hasLastChangeDatesToCompare = lastChangeLocal !== null && lastChange !== null;

          if(hasLastChangeDatesToCompare && lastChange > lastChangeLocal){
            localStorage.removeItem('routesData');
            localStorage.removeItem('routesLastChange');
            fetchRoutesData();
          } else {
            setRoutes(JSON.parse(routesData));
          }
        }).catch(error => {
          console.log(error);
        });
      } else {
        fetchRoutesData();
      }
    } else {
      const routesData = localStorage.getItem('routesData');
      if(routesData !== null) setRoutes(JSON.parse(routesData));
    }
  }, []);

  const fetchRoutesData = (): void => {
    const url = (isDev()) ? 'http://localhost:3001/api/bikelanes' : 'https://api.onthe.bike/api/bikelanes';
    fetch(url)
    .then(res => res.json())
    .then((res) => {
      const routes: BikeLane[] = res[ 0 ];
      if(routes){
        const { last_changed_at } = res[ 1 ];
        const parsedRoutes = parseRoutesData(routes);
        localStorage.setItem('routesData', JSON.stringify({ type: 'FeatureCollection', features: parsedRoutes }));
        localStorage.setItem('routesLastChange', last_changed_at);

        setRoutes({ type: 'FeatureCollection', features: parsedRoutes });
      }
    }).catch(error => {
      console.log(error);
    });
  }

  const parseRoutesData = (bikelanesData: BikeLane[]): ParsedBikeLane[] => {
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
  }

  const styleRoutes = (feature: any, layer: L.Path): void => {
    const { filterType, filterOptions } = mapCtx.state;
    filterOptions.forEach(opt => {
      if(opt.value.toString() === feature.properties[ filterType ].toString()){
        if(opt.checked === true){
          feature.currentColor = opt.color;
          layer.setStyle({ color: opt.color, className: '' })
        } else {
          layer.setStyle({ opacity: 0, className: 'unhoverable' })
        }
      }
    });
  }

  if(routes === null) return null;

  const { filterType } = mapCtx.state;
  let routeOptions: RouteOptions = {
    color: '#006699',
    weight: '3',
    opacity: '0.9',
    bubblingMouseEvents: false,
    onEachFeature: (feature: any) => {
      feature.currentColor = '#006699';
    }
  }
  if(filterType && filterType !== 'default'){
    routeOptions = {
      weight: '3',
      opacity: '0.9',
      bubblingMouseEvents: false,
      onEachFeature: styleRoutes
    }
  }
  return <GeoJSON data={ routes } options={ routeOptions } />;
}
