import { Component } from 'react';
import L from 'leaflet';
import { MapContext } from '../../../../context/MapContext';

class TileLayer extends Component {
  state = {
    created: false
  }

  componentDidMount(){
    const tileLayerOptions = {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: 'Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery © <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a>'
    }
    const {map} = this.context;

    if(!this.state.created){
      L.tileLayer(tileLayerOptions.url, {
        attribution: tileLayerOptions.attribution,
        maxZoom: 20,
        minZoom: 6,
        opacity: 0.5
      }).addTo(map);
      this.setState({created: true});
    }
  }
  render = () => null;
}
TileLayer.contextType = MapContext;

export default TileLayer;