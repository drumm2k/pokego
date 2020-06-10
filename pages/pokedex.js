import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { initializeApollo } from '../lib/apolloClient';
import Title from '../components/Title';
import Pdex from '../components/Pokedex';

export const GET_ALL_POKEMONS = gql`
  query {
    getPokemonsPure {
      pokemonId
      type
      type2
      stats {
        baseStamina
        baseAttack
        baseDefense
      }
      familyId
      candyToEvolve
      pokedex {
        pokemonNum
      }
    }
  }
`;

export default function Pokedex() {
  const { data, loading, error } = useQuery(GET_ALL_POKEMONS);

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;

  const { getPokemonsPure } = data;

  return (
    <>
      <Title color="#bb00c8">Покедекс</Title>
      <Pdex pokemons={getPokemonsPure} />
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_ALL_POKEMONS,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  };
}
