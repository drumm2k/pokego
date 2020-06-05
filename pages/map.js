import dynamic from 'next/dynamic';
import Title from '../components/Title';

const MapWithNoSSR = dynamic(() => import('../components/Map'), {
  ssr: false,
});

const MyMap = () => (
  <div>
    <Title color="#aa306f">Карта</Title>
    <MapWithNoSSR />
  </div>
);

export default MyMap;
