import { Component } from 'react';
import L from 'leaflet';
import { MapContext } from '../../../../context/MapContext';

class TileLayer extends Component {
  state = {
    created: false
  }

  componentDidMount(){
    if(this.state.created) return;
    const tileLayerOptions = {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
    }
    const { map } = this.context;

    L.tileLayer(tileLayerOptions.url, {
      attribution: tileLayerOptions.attribution,
      maxZoom: 20,
      minZoom: 6,
      opacity: 0.5
    }).addTo(map);

    this.setState({ created: true });
  }

  render = () => null;
}
TileLayer.contextType = MapContext;

export default TileLayer;
