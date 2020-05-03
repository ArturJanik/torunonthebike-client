import { Component } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { MapContext } from '../../../../../context/MapContext';

class GeoJSON extends Component {
  state = {
    lanesLayer: null
  }

  componentDidMount(){
    this.showGeoJSONRoutes();
  }

  componentDidUpdate(prevProps){
    const { map } = this.context;
    if((this.props.options !== prevProps.options) && map.hasLayer(this.state.lanesLayer)){
      map.removeLayer(this.state.lanesLayer);
      map.almostOver.removeLayer(this.state.lanesLayer);
      this.showGeoJSONRoutes();
    }
  }

  showGeoJSONRoutes = () => {
    const { map } = this.context;
    const { data, options } = this.props;
    const routes = L.geoJSON(data, options).addTo(map);
    map.almostOver.addLayer(routes);
    this.setState({ lanesLayer: routes });
  }

  render = () => null;
}
GeoJSON.contextType = MapContext;

GeoJSON.propTypes = {
  data: PropTypes.object,
  options: PropTypes.shape({
    color: PropTypes.string,
    weight: PropTypes.string,
    opacity: PropTypes.string,
    bubblingMouseEvents: PropTypes.bool,
    onEachFeature: PropTypes.func
  }),
};

export default GeoJSON;
