import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { initializeApollo } from '../lib/apolloClient';
import RaidTier from '../components/RaidTier';
import Title from '../components/Title';

export const GET_ALL_RAIDS = gql`
  query {
    getRaidsFull {
      raids {
        tier
        raids {
          pokemon
          shiny
        }
      }
      pokemons {
        pokemonId
        type
        type2
        stats {
          baseStamina
          baseAttack
          baseDefense
        }
        pokedex {
          pokemonNum
        }
      }
    }
  }
`;

export default function Raids() {
  const { data, loading, error } = useQuery(GET_ALL_RAIDS);

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;

  const { getRaidsFull } = data;

  return (
    <>
      <Title color="#009dc8">Рейды</Title>
      {getRaidsFull.raids.map((tier) => (
        <RaidTier
          key={tier.tier}
          id={tier.tier}
          tiersData={tier.raids}
          pokemonsData={getRaidsFull.pokemons}
        />
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
