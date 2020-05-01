import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, LayerGroup } from 'react-leaflet';
import { LeafletStyles, MarkerClusterStyles } from './MapStyles';
import MarkerClusterGroup from 'react-leaflet-markercluster';

// Coordinates array
let coords = [];

// Generate random coordinate
function generateRandomCoord(min, max) {
  return Math.random() * (min - max) + max;
}

// Generate random coordinates func
function generateCoords(id) {
  // x, y min-max values
  const amin = 59.5;
  const amax = 60.2;
  const bmin = 30;
  const bmax = 30.6;

  // Push to array
  coords.push({
    x: generateRandomCoord(amin, amax),
    y: generateRandomCoord(bmin, bmax),
    id: id,
  });
}

// Generate X random coordinates
for (let x = 0; x < 500; x++) {
  generateCoords(x);
}

class MyMap extends Component {
  state = {
    center: [59.93863, 30.31413],
    zoom: 13,
  };

  render() {
    // Canvas Markers shaped as circles (good performance)
    // Need to import CircleMarker from react-leaflet

    // const MarkersOnCanvas = coords.map((marker) => (
    //   <CircleMarker
    //     key={`marker_${marker.id}`}
    //     center={[marker.x, marker.y]}
    //     color={'#8b32a8'}
    //     weight={7}
    //     radius={3}
    //   >
    //     <Popup>
    //       <div>User {marker.id}</div>
    //       <div>Trainer Code: 123456789</div>
    //     </Popup>
    //   </CircleMarker>
    // ));

    // Usual Markers decided to keep this for now (medium performance)
    const Markers = coords.map((marker) => (
      <Marker key={marker.id} position={[marker.x, marker.y]}>
        <Popup>
          <div>User {marker.id}</div>
          <div>Trainer Code: 123456789</div>
        </Popup>
      </Marker>
    ));

    return (
      <div>
        <LeafletStyles />
        <MarkerClusterStyles />
        <Map
          preferCanvas={true}
          center={this.state.center}
          zoom={this.state.zoom}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution=""
          />
          {/* {MarkersOnCanvas} */}
          <MarkerClusterGroup>
            <LayerGroup>{Markers}</LayerGroup>
          </MarkerClusterGroup>
        </Map>
      </div>
    );
  }
}

export default MyMap;
