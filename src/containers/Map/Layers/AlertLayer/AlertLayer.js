import { Component } from 'react';
import axios from 'axios';
import L from 'leaflet';
import createPopup from '../EventLayer/RoutePopup/RoutePopup';
import styles from './AlertLayer.module.css';
import { MapContext } from '../../../../context/MapContext';

class AlertLayer extends Component {
  state = {
    leafletAlertsLayer: null,
    alertsData: null,
    alertsLoading: false,
    alertsError: null
  };

  icons = [
    L.divIcon({
      iconSize: [ 48, 48 ], iconAnchor: [ 24, 24 ], popupAnchor: [ 0, -32 ], className: styles.alert_info
    }),
    L.divIcon({
      iconSize: [ 48, 48 ], iconAnchor: [ 24, 24 ], popupAnchor: [ 0, -32 ], className: styles.alert_works
    }),
    L.divIcon({
      iconSize: [ 48, 48 ], iconAnchor: [ 24, 24 ], popupAnchor: [ 0, -32 ], className: styles.alert_visibility
    }),
  ];

  async componentDidMount(){
    const alertsData = localStorage.getItem('alertsData');
    const lastLocalChange  = localStorage.getItem('alertsLastChange');
    if(alertsData === null || lastLocalChange === null){
      await this.fetchAlertsData();
      this.drawAlertsLayer();
    } else {
      const url = (process.env.NODE_ENV === 'development') ? 'http://localhost:3001/api/alerts/verify_last_modification' : 'https://api.onthe.bike/api/alerts/verify_last_modification';
      
      axios.post(url, { lastLocalChange })
      .then(res => {
        const upToDate = res.data;
        this.handleUptodateStatus(upToDate);
      }).catch(err => {
        this.setState({ error: 'Błąd serwera. Spróbuj ponownie później.' });
      });
    }
  }

  componentWillUnmount(){
    if(this.state.leafletAlertsLayer) {
      this.state.leafletAlertsLayer.remove();
    }
  }

  handleUptodateStatus = async (isUptodate) => {
    if(isUptodate){
      const alertsData = localStorage.getItem('alertsData');
      await this.setState({ alertsData: JSON.parse(alertsData) });
    } else {
      await this.fetchAlertsData();
    }
    this.drawAlertsLayer();
  }

  fetchAlertsData = () => {
    this.setState({ alertsLoading: true });
    const url = (process.env.NODE_ENV === 'development') ? 'http://localhost:3001/api/alerts' : 'https://api.onthe.bike/api/alerts';
    return axios.get(url)
    .then(res => {
      const alertsData = res.data.alerts;
      const alertsLastChange = res.data.modificationDate;
      this.setState({ alertsData, alertsLoading: false })
      localStorage.setItem('alertsData', JSON.stringify(alertsData));
      localStorage.setItem('alertsLastChange', alertsLastChange);
    }).catch(err => this.setState({ alertsError: err, alertsLoading: false }));
  }

  drawAlertsLayer = () => {
    if(this.state.alertsError || this.state.alertsData === null) return;
    const { map } = this.context;

    const alerts = L.layerGroup(this.state.alertsData.map(alert => {
      const popup = createPopup('alert', { description: alert.description });
      return L.marker(JSON.parse(alert.latlng), { icon: this.icons[ alert.type ] }).bindPopup(popup, { className: 'popup', minWidth: 200 });
    }));
    this.setState({ leafletAlertsLayer: alerts });
    alerts.addTo(map);
  }

  render = () => null;
}
AlertLayer.contextType = MapContext;

export default AlertLayer;
