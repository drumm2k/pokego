import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Title from '../components/Title';
import AuthContext from '../context/auth';

const MapWithNoSSR = dynamic(() => import('../components/Map/Map'), {
  ssr: false,
});

export default function MyMap() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  // Route to login if not authorized
  // if (!auth.token) router.push('/login');

  return (
    <>
      <Title color="#aa306f">Карта</Title>
      <MapWithNoSSR />
    </>
  );
}
