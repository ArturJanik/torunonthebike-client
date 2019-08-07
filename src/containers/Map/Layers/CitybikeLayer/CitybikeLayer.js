import { Component } from 'react';
import axios from 'axios';
import L from 'leaflet';
import createPopup from '../EventLayer/RoutePopup/RoutePopup';
import { MapContext } from '../../../../context/MapContext';
import styles from './CitybikeLayer.module.css';

const urls = {
  uptodate: (process.env.NODE_ENV === 'development') ? 'http://localhost:3001/api/stations/verify_last_modification' : 'https://api.onthe.bike/api/stations/verify_last_modification',
  getdata: (process.env.NODE_ENV === 'development') ? 'http://localhost:3001/api/stations' : 'https://api.onthe.bike/api/stations'
}

class CitybikeLayer extends Component {
  state = {
    localsValid: false,

    leafletStationsLayer: null,
    stationsData: null,
    stationsLoading: false,
    stationsError: null
  }

  icons = [
    L.divIcon({
      iconSize: [48, 48], iconAnchor: [24, 24], popupAnchor: [0, -32], className: styles['icon--station']
    })
  ]

  async componentDidMount(){
    try {
      await this.validateLocals();
      if(this.state.localsValid){
        this.checkIfDataInSync()
        .then(() => {
          this.drawStationsLayer();
        }).catch(err => {this.setState({stationsError: err, stationsLoading: false})});
      } else {
        this.fetchStationsData()
        .then(() => {
          this.drawStationsLayer();
        }).catch(err => {this.setState({stationsError: err, stationsLoading: false})});
      }
    } catch (error) {
      console.log(error);
      this.setState({stationsError: error, stationsLoading: false})
    }
  }

  componentWillUnmount(){
    if(this.state.leafletStationsLayer) {
      this.state.leafletStationsLayer.remove();
    }
  }

  validateLocals = () => {
    const localStationsData = localStorage.getItem('stationsData');
    const lastLocalChange = localStorage.getItem('stationsLastChange');
    return this.setState({ localsValid: (localStationsData && lastLocalChange) });
  }

  fetchStationsData = () => {
    this.setState({stationsLoading: true});
    return axios.get(urls.getdata)
    .then(res => {
      const {stations, modificationDate} = res.data;
      if(stations.length > 0 && modificationDate !== null){
        localStorage.setItem('stationsData', JSON.stringify(stations));
        localStorage.setItem('stationsLastChange', modificationDate);
        return this.setState({ stationsData: stations, stationsLoading: false, localsValid: true });
      } else {
        this.setState({ stationsLoading: false, localsValid: false });
        throw new Error('Error: no stations data available on server.');
      }
    })
    .catch(err => err);
  }

  checkIfDataInSync = () => {
    const lastLocalChange = localStorage.getItem('stationsLastChange');
    
    return axios.post(urls.uptodate, {lastLocalChange})
    .then(res => {
      const upToDate = res.data;
      if(upToDate){
        const localStationsData = localStorage.getItem('stationsData');
        return this.setState({stationsData: JSON.parse(localStationsData)});
      } else {
        return this.fetchStationsData();
      }

    }).catch(err => err);
  }

  drawStationsLayer = () => {
    if(this.state.stationsError || this.state.stationsData === null) return;
    const {map} = this.context;

    const stations = L.layerGroup(this.state.stationsData.map(station => {
      const popup = createPopup('station', {name: station.name});
      return L.marker([station.lat, station.lng], {icon: this.icons[0]}).bindPopup(popup, {className: 'popup', minWidth: 200});
    }));
    this.setState({leafletStationsLayer: stations});
    stations.addTo(map);
  }

  render = () => null;
}
CitybikeLayer.contextType = MapContext;

export default CitybikeLayer;