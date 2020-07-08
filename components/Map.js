import { Component } from 'react';
import styled from 'styled-components';
import { Map, TileLayer, Marker, Popup, LayerGroup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Control from 'react-leaflet-control';
import { LeafletStyles, MarkerClusterStyles } from './MapStyles';
import LocationMarker from '../assets/location_marker.svg';

const DetectMyLocation = styled.a`
  display: block;
  background: #fff;
  width: 26px;
  height: 26px;
  line-height: 26px;
  padding: 2px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
  border-radius: 4px;
  background-position: 50% 50%;
  background-repeat: no-repeat;

  :hover {
    background-color: #f4f4f4;
  }
`;

// Coordinates array
const coords = [];

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
    id,
  });
}

// Generate X random coordinates
for (let x = 0; x < 500; x += 1) {
  generateCoords(x);
}

class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [59.93863, 30.31413],
      zoom: 13,
    };
  }

  setPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // Not an ideal way to center current location
        this.setState({
          position: [59.93863, 30.31413],
        });
        this.setState({
          position: [position.coords.latitude, position.coords.longitude],
        });
      });
    } else {
      console.log('Geolocation is not available');
    }
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
          <div>
            User
            {marker.id}
          </div>
          <div>Trainer Code: 123456789</div>
        </Popup>
      </Marker>
    ));

    const { zoom, position } = this.state;

    return (
      <>
        <LeafletStyles />
        <MarkerClusterStyles />
        <Map preferCanvas center={position} zoom={zoom}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution=""
          />
          <Control position="topleft">
            <DetectMyLocation
              // className="leaflet-bar"
              href="#"
              onClick={this.setPosition}
            >
              <LocationMarker stroke="#000" />
            </DetectMyLocation>
          </Control>
          {/* {MarkersOnCanvas} */}
          <MarkerClusterGroup>
            <LayerGroup>{Markers}</LayerGroup>
          </MarkerClusterGroup>
        </Map>
      </>
    );
  }
}

export default MyMap;
