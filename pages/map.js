import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('../components/Map'), {
  ssr: false,
});

const Title = styled.h2`
  color: #ff3163;
  margin-bottom: 1.5rem;
`;

const MyMap = () => (
  <div>
    <Title>Карта</Title>
    <MapWithNoSSR />
  </div>
);

export default MyMap;
