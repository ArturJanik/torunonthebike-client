import { Component } from 'react';
import axios from 'axios';
import L from 'leaflet';
import createPopup from '../EventLayer/RoutePopup/RoutePopup';
import styles from './AlertLayer.module.css';
import { MapContext } from '../../../../context/MapContext';

class AlertLayer extends Component {
  state = {
    alerts: null,
    alertsData: null,
    alertsLoading: false,
    alertsError: null
  }

  icons = [
    L.divIcon({
      iconSize: [48, 48], iconAnchor: [24, 24], popupAnchor: [0, -32], className: styles['icon--alert1']
    }),
    L.divIcon({
      iconSize: [48, 48], iconAnchor: [24, 24], popupAnchor: [0, -32], className: styles['icon--alert2']
    }),
    L.divIcon({
      iconSize: [48, 48], iconAnchor: [24, 24], popupAnchor: [0, -32], className: styles['icon--alert3']
    })
  ]

  async componentDidMount(){
    const alertsData = localStorage.getItem('alertsData');
    if(alertsData === null){
      await this.fetchAlertsData();
      this.drawAlertsLayer();
    } else {
      const lastLocalChange = localStorage.getItem('alertsLastChange');
      
      const url = (process.env.NODE_ENV === 'development') ? 'http://localhost:3001/api/alerts/verify_last_modification' : 'https://api.onthe.bike/api/alerts/verify_last_modification';
      
      axios.post(url, {lastLocalChange})
      .then(res => {
        const upToDate = res.data;
        this.handleUptodateStatus(upToDate);
      }).catch(err => {
        this.setState({error: 'Błąd serwera. Spróbuj ponownie później.'});
      });
    }
  }

  componentWillUnmount(){
    if(this.state.alerts) {
      this.state.alerts.remove();
      this.setState({alerts: null});
    }
  }

  handleUptodateStatus = async (isUptodate) => {
    if(isUptodate){
      const alertsData = localStorage.getItem('alertsData');
      await this.setState({alertsData: JSON.parse(alertsData)});
    } else {
      await this.fetchAlertsData();
    }
    this.drawAlertsLayer();
  }

  fetchAlertsData = () => {
    const url = (process.env.NODE_ENV === 'development') ? 'http://localhost:3001/api/alerts' : 'https://api.onthe.bike/api/alerts';
    return axios.get(url)
    .then(res => {
      const alertsData = res.data.alerts;
      const alertsLastChange = res.data.modificationDate;
      this.setState({ alertsData, alertsLoading: false })
      localStorage.setItem('alertsData', JSON.stringify(alertsData));
      localStorage.setItem('alertsLastChange', alertsLastChange);
    }).catch(err => this.setState({alertsError: err, alertsLoading: false}));
  }

  drawAlertsLayer = () => {
    if(this.state.alertsError || this.state.alertsData === null) return;
    const {map} = this.context;

    const alerts = L.layerGroup(this.state.alertsData.map(alert => {
      const popup = createPopup('alert', {description: alert.description});
      return L.marker(JSON.parse(alert.latlng), {icon: this.icons[alert.type]}).bindPopup(popup, {className: 'popup', minWidth: 200});
    }));
    this.setState({alerts});
    alerts.addTo(map);
  }

  render = () => null;
}
AlertLayer.contextType = MapContext;

export default AlertLayer;