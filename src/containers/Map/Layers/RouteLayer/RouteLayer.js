import React, { Component } from 'react';
import axios from 'axios';
import GeoJSON from './GeoJSON/GeoJSON';
import { MapContext } from '../../../../context/MapContext';

class RouteLayer extends Component {
  state = {
    routes: null
  }

  componentDidMount(){
    if(navigator.onLine){
      const routesData = localStorage.getItem('routesData');
      if(routesData !== null) {
        const url = (process.env.NODE_ENV === 'development') ? 'http://localhost:3001/api/bikelanes/last_modification' : 'https://api.onthe.bike/api/bikelanes/last_modification';
        axios.get(url)
        .then(res => {
          const lastChange = (res.data.last_changed_at !== null) ? new Date(res.data.last_changed_at) : null;
          const lastChangeLocal = (localStorage.getItem('routesLastChange') !== null) ? new Date(localStorage.getItem('routesLastChange')) : null;

          if(lastChange > lastChangeLocal){
            localStorage.removeItem('routesData');
            localStorage.removeItem('routesLastChange');
            this.fetchRoutesData();
          } else {
            this.setState({ routes: JSON.parse(routesData) });
          }
        }).catch(error => {
          console.log(error);
        });
      } else {
        this.fetchRoutesData();
      }
    } else {
      const routesData = localStorage.getItem('routesData');
      if(routesData !== null) this.setState({ routes: JSON.parse(routesData) });
    }
  }

  fetchRoutesData = () => {
    const url = (process.env.NODE_ENV === 'development') ? 'http://localhost:3001/api/bikelanes' : 'https://api.onthe.bike/api/bikelanes';
    axios.get(url)
    .then(res => {
      const routes = res.data[ 0 ];
      if(routes){
        const { last_changed_at } = res.data[ 1 ];
        const parsedRoutes = this.parseRoutesData(routes);
        localStorage.setItem('routesData', JSON.stringify({ type: 'FeatureCollection', features: parsedRoutes }));
        localStorage.setItem('routesLastChange', last_changed_at);

        this.setState({ routes: { type: 'FeatureCollection', features: parsedRoutes } });
      }
    }).catch(error => {
      console.log(error);
    });
  }

  parseRoutesData = (routesData) => {
    return routesData.map((route) => ({
      type: 'Feature',
      properties: {
        street: route[ 'street' ],
        roadlane: route[ 'roadlane' ],
        nameFrom: route[ 'name_from' ],
        nameTo: route[ 'name_to' ],
        type: route[ 'type' ],
        surface: route[ 'surface' ],
        quality: route[ 'quality' ]
      },
      geometry: {
        type: 'LineString',
        coordinates: JSON.parse(route[ 'points' ])
      }
    }));
  }

  styleRoutes = (feature, layer) => {
    const { filterType, filterOptions } = this.context;
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

  render = () => {
    if(this.state.routes === null) return null;

    const { filterType } = this.context;
    let routeOptions = {
      color: '#006699',
      weight: '3',
      opacity: '0.9',
      bubblingMouseEvents: false,
      onEachFeature: (feature, layer) => {
        feature.currentColor = '#006699';
      }
    }
    if(filterType && filterType !== 'default'){
      routeOptions = {
        weight: '3',
        opacity: '0.9',
        bubblingMouseEvents: false,
        onEachFeature: this.styleRoutes
      }
    }
    return <GeoJSON data={ this.state.routes } options={ routeOptions } />;
  }
}
RouteLayer.contextType = MapContext;

export default RouteLayer;
