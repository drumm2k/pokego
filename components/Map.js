import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { LeafletStyles, MarkerClusterStyles } from './MapStyles';
import MarkerClusterGroup from 'react-leaflet-markercluster';

// Coordinates array
let coords = [];

// Generate random coordinate
function generateRandomCoord(min, max) {
  let randomCoord = Math.random() * (min - max) + max;

  return randomCoord;
}

// Generate random coordiantes
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

// Working slow with so many DOM elements, need to use canvas or webgl
for (let x = 0; x < 9900; x++) {
  generateCoords(x);
}

class MyMap extends Component {
  state = {
    center: [59.93863, 30.31413],
    zoom: 13,
  };

  render() {
    return (
      <div>
        <LeafletStyles />
        <MarkerClusterStyles />
        <Map center={this.state.center} zoom={this.state.zoom}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          />
          <MarkerClusterGroup>
            {coords.map((marker) => (
              <Marker key={marker.id} position={[marker.x, marker.y]}>
                <Popup>{marker.id}</Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </Map>
      </div>
    );
  }
}

export default MyMap;
