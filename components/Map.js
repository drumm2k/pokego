import { Component } from 'react';
import styled from 'styled-components';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  LayerGroup,
  Circle,
  CircleMarker,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Control from 'react-leaflet-control';
import { LeafletStyles, MarkerClusterStyles } from './MapStyles';
import LocationMarker from '../assets/location_marker.svg';

const DetectMyLocation = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  width: 30px;
  height: 30px;
  line-height: 30px;
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
for (let x = 0; x < 50; x += 1) {
  generateCoords(x);
}

class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [59.93863, 30.31413],
      zoom: 13,
      trainer: null,
    };
  }

  componentDidMount() {
    const { trainer } = this.state;

    if (trainer) {
      this.setState({
        position: trainer,
      });
    }
  }

  setPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            position: '',
          });
          this.setState({
            position: [position.coords.latitude, position.coords.longitude],
            trainer: [position.coords.latitude, position.coords.longitude],
            zoom: 15,
          });
        },
        (error) => {
          console.error(`Error: ${error.code} - ${error.message}`);
        }
      );
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

    const { zoom, position, trainer } = this.state;

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
            <DetectMyLocation onClick={this.setPosition}>
              <LocationMarker stroke="#000" />
            </DetectMyLocation>
          </Control>
          {/* {MarkersOnCanvas} */}
          {trainer && (
            <>
              <Circle
                center={trainer}
                color="#136acc"
                fillOpacity={0.15}
                stroke={false}
                radius={200}
              />
              <CircleMarker
                center={trainer}
                color="#479ce6"
                fillColor="#1a7fd6"
                fillOpacity={0.9}
                radius={10}
              />
            </>
          )}
          <MarkerClusterGroup>
            <LayerGroup>{Markers}</LayerGroup>
          </MarkerClusterGroup>
        </Map>
      </>
    );
  }
}

export default MyMap;
