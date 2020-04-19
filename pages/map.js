import React from 'react';
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('../components/map'), {
  ssr: false,
});

const MyMap = () => <MapWithNoSSR />;

export default MyMap;
