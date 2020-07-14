import { gql, useQuery } from '@apollo/client';
import { initializeApollo } from '../lib/apolloClient';
import RaidTier from '../components/RaidTier';
import Title from '../components/Title';

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

export default function Raids() {
  const { data, loading, error } = useQuery(GET_ALL_RAIDS);

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;

  const { getRaids } = data;

  return (
    <>
      <Title color="#009dc8">Рейды</Title>
      {getRaids.map((tier) => (
        <RaidTier key={tier.id} id={tier.tier} tiersData={tier} />
      ))}
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
    unstable_revalidate: 1,
  };
}
