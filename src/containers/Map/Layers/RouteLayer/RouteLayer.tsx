import { useContext, useEffect, useState } from 'react';
import { GeoJSON } from './GeoJSON/GeoJSON';
import { FilterOption, FilterType, MapContext } from 'context/MapContext';
import { getRoutesData } from './utils/getRoutesData';
import { BikeLane } from './types/bikelane';

export interface Routes {
  type: 'FeatureCollection';
  features: BikeLane[];
}

export interface RouteOptions {
  color?: string;
  weight: string;
  opacity: string;
  bubblingMouseEvents: boolean;
  onEachFeature: (feature: any, layer: L.Path) => void;
}

export const RouteLayer = (): JSX.Element => {
  const mapCtx = useContext(MapContext);
  const { map, filterType, filterOptions } = mapCtx.state;

  const [routes, setRoutes] = useState<Routes | null>(null);

  if (map === null || !navigator.onLine) {
    return <></>;
  }

  useEffect(() => {
    getRoutesData()
      .then((routesData) => {
        setRoutes({ type: 'FeatureCollection', features: routesData });
      });
  }, []);

  if (routes === null) {
    return <></>;
  }

  const routeOptions = getRouteOptions(filterType, filterOptions);

  return (
    <GeoJSON data={routes} options={routeOptions} map={map} />
  );
};

const getRouteOptions = (type: FilterType, options: FilterOption[]): RouteOptions => {
  const baseOptions: RouteOptions = {
    weight: '3',
    opacity: '0.9',
    bubblingMouseEvents: false,
    onEachFeature: () => {},
  };

  if (type !== 'default') {
    return {
      ...baseOptions,
      onEachFeature: (feature: any, layer: L.Path) => styleRoutes(feature, layer, type, options),
    }
  }

  return {
    ...baseOptions,
    color: '#006699',
    onEachFeature: (feature: any) => {
      feature.currentColor = '#006699';
    },
  };
};

const styleRoutes = (feature: any, layer: L.Path, type: FilterType, options: FilterOption[]): void => {
  options.forEach(opt => {
    if(opt.value.toString() === feature.properties[type].toString()){
      if(opt.checked === true){
        feature.currentColor = opt.color;
        layer.setStyle({ color: opt.color, className: '' })
      } else {
        layer.setStyle({ opacity: 0, className: 'unhoverable' })
      }
    }
  });
};
