import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../lib/apollo';
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
      movesets {
        quickMove
        cinematicMove
      }
      pokedex {
        pokemonNum
      }
    }
  }
`;

function Pokedex() {
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

export default withApollo({ ssr: true })(Pokedex);
