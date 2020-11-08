import LocationMarker from 'assets/location_marker.svg';
import { useEffect, useState } from 'react';
import {
  Circle,
  CircleMarker,
  LayerGroup,
  Map,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';
import Control from 'react-leaflet-control';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import styled from 'styled-components';
import { LeafletStyles, MarkerClusterStyles } from './MapStyles';

// Coordinates array
const coords: any = [];

// Generate random coordinate
function generateRandomCoord(min: number, max: number) {
  return Math.random() * (min - max) + max;
}

// Generate random coordinates func
function generateCoords(id: number) {
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

export default function MyMap() {
  const [mapConf, setMapConf] = useState<{
    position: any;
    zoom: number;
    trainer: any;
  }>({
    position: [59.93863, 30.31413],
    zoom: 13,
    trainer: null,
  });

  useEffect(() => {
    if (mapConf.trainer) {
      setMapConf((prev) => {
        return { ...prev, position: mapConf.trainer };
      });
    }
  }, []);

  function setPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setMapConf((prev) => {
            return { ...prev, position: null };
          });
          setMapConf((prev) => {
            return {
              ...prev,
              position: [position.coords.latitude, position.coords.longitude],
              trainer: [position.coords.latitude, position.coords.longitude],
              zoom: 15,
            };
          });
        },
        (error) => {
          console.error(`Error: ${error.code} - ${error.message}`);
        }
      );
    }
  }

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
  const Markers = coords.map((marker: { x: number; y: number; id: number }) => (
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

  return (
    <>
      <LeafletStyles />
      <MarkerClusterStyles />
      <Map preferCanvas center={mapConf.position} zoom={mapConf.zoom}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution=""
        />
        <Control position="topleft">
          <DetectMyLocation onClick={setPosition}>
            <LocationMarker stroke="#000" />
          </DetectMyLocation>
        </Control>
        {/* {MarkersOnCanvas} */}
        {mapConf.trainer && (
          <>
            <Circle
              center={mapConf.trainer}
              color="#136acc"
              fillOpacity={0.15}
              stroke={false}
              radius={200}
            />
            <CircleMarker
              center={mapConf.trainer}
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
