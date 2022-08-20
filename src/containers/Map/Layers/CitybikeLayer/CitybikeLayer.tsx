import { useState, useEffect, useContext } from 'react';
import * as L from 'leaflet';
import { createStationPopup } from '../EventLayer/RoutePopup/RoutePopup';
import { MapContext } from '../../../../context/MapContext';
import styles from './CitybikeLayer.module.css';
import { isDev } from '../../../../utilities/isEnv';

const urls = {
  uptodate: (isDev()) ? 'http://localhost:3001/api/stations/verify_last_modification' : 'https://api.onthe.bike/api/stations/verify_last_modification',
  getdata: (isDev()) ? 'http://localhost:3001/api/stations' : 'https://api.onthe.bike/api/stations'
}

interface CitybikeLayerState {
  localsValid: boolean;
  leafletStationsLayer: L.LayerGroup<any> | null;
  stationsData: any[] | null;
  stationsLoading: boolean;
  stationsError: any | null;
}

export const CitybikeLayer = (): JSX.Element => {
  const mapCtx = useContext(MapContext);
  const { map } = mapCtx.state;

  const [state, setState] = useState<CitybikeLayerState>({
    localsValid: false,
    leafletStationsLayer: null,
    stationsData: null,
    stationsLoading: false,
    stationsError: null
  });

  useEffect(() => {
    drawStationsLayer();
  }, [state.stationsData]);

  useEffect(() => {
    return () => {
      if (state.leafletStationsLayer !== null) {
        state.leafletStationsLayer.remove();
      };
    }
  }, [state.leafletStationsLayer]);

  useEffect(() => {
    validateLocals();

    if(state.localsValid){
      checkIfDataInSync()
      .catch((err: any) => { 
        setState((prevState) => ({ ...prevState, stationsError: err, stationsLoading: false }));
      });
    } else {
      fetchStationsData()
      .catch((err: any) => {
        setState((prevState) => ({ ...prevState, stationsError: err, stationsLoading: false }));
      });
    }
  }, []);

  const validateLocals = (): void => {
    const localStationsData = localStorage.getItem('stationsData');
    const lastLocalChange = localStorage.getItem('stationsLastChange');
    const localsValid = localStationsData !== null && lastLocalChange !== null;
    setState((prevState) => ({ ...prevState, localsValid }));
  }

  const fetchStationsData = (): Promise<any> => {
    setState((prevState) => ({ ...prevState, stationsLoading: true }));

    return fetch(urls.getdata)
      .then(res => res.json())
      .then(res => {
        const { stations, modificationDate } = res;
        if(stations.length > 0 && modificationDate !== null){
          localStorage.setItem('stationsData', JSON.stringify(stations));
          localStorage.setItem('stationsLastChange', modificationDate);
          setState((prevState) => ({ ...prevState, stationsData: stations, stationsLoading: false, localsValid: true }));
        } else {
          setState((prevState) => ({ ...prevState, stationsLoading: false, localsValid: false }));
          throw new Error('Error: no stations data available on server.');
        }
      })
      .catch(err => err);
  }

  const checkIfDataInSync = (): Promise<any> => {
    const lastLocalChange = localStorage.getItem('stationsLastChange');

    if (lastLocalChange !== null) {
      return fetch(urls.uptodate, { method: 'POST', body: JSON.stringify({ lastLocalChange }) })
        .then(res => res.json())
        .then(upToDate => {
          if(upToDate){
            const localStationsData = localStorage.getItem('stationsData');
            if (localStationsData !== null) {
              setState((prevState) => ({ ...prevState, stationsData: JSON.parse(localStationsData)}));
            }
          } else {
            return fetchStationsData();
          }
        }).catch(err => err);
    }

    throw new Error('Error: no data of last station update available on server.');
  }

  const drawStationsLayer = () => {
    if(state.stationsError || state.stationsData === null || map === null) return;

    const icon = L.divIcon({
      iconSize: [ 48, 48 ],
      iconAnchor: [ 24, 24 ],
      popupAnchor: [ 0, -32 ],
      className: styles.icon,
    });

    const stations = L.layerGroup(state.stationsData.map(station => {
      const popup = createStationPopup(station.name);
      return L.marker([ station.lat, station.lng ], { icon }).bindPopup(popup, { className: 'popup', minWidth: 200 });
    }));

    setState((prevState) => ({ ...prevState, leafletStationsLayer: stations }));
    stations.addTo(map);
  }

  return (
    <></>
  );
}

export default CitybikeLayer;
