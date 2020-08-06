import { gql, useMutation, useQuery } from '@apollo/client';
import { useContext } from 'react';
import RaidTier from '../components/Raids/RaidTier';
import Title from '../components/Title';
import { Button } from '../components/UI';
import AuthContext from '../context/auth';
import { initializeApollo } from '../lib/apolloClient';

export const GET_ALL_RAIDS = gql`
  query {
    getRaids {
      tier
      id
      raids {
        shiny
        verified
        cp
        pokemon {
          name
          pokedex
          type1
          type2
          baseStamina
          baseAttack
          baseDefense
        }
      }
    }
  }
`;

export const REFRESH_RAIDS = gql`
  mutation {
    initRaids {
      id
    }
  }
`;

export default function Raids() {
  const auth = useContext(AuthContext);
  const { data, loading, error } = useQuery(GET_ALL_RAIDS);
  const [refresh, { error: refreshError }] = useMutation(REFRESH_RAIDS, {
    onCompleted() {
      console.log('Refreshed successfully');
    },
  });

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;

  const { getRaids } = data;

  return (
    <>
      <Title color="#009dc8">Рейды</Title>
      {getRaids.map((tier) => (
        <RaidTier key={tier.id} id={tier.tier} tiersData={tier} />
      ))}
      {auth.user && auth.user.roles.includes('admin') && (
        <Button onClick={refresh}>Refresh Raids</Button>
      )}
      {refreshError && <p>{refreshError.message}</p>}
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_ALL_RAIDS,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}
