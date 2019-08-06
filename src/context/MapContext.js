import React, { Component } from 'react';

export const MapContext = React.createContext();
export const MapConsumer = MapContext.Consumer;

export class MapProvider extends Component {
  constructor(props){
    super(props);
    this.state = {
      map: null,

      setMap: this.setMap,
    }
  }

  setMap = (mapObj) => {
    if(this.state.map === null) this.setState({map: mapObj});
  }

  render(){
    return (
      <MapContext.Provider value={this.state}>
        {this.props.children}
      </MapContext.Provider>
    )
  }
}