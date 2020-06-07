import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import RaidCard from './RaidCard';

const Tier = styled.div`
  display: grid;
  grid-row-gap: 1rem;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    grid-column-gap: 1rem;
    grid-template-columns: 50% 50%;
  }
`;

export const GET_ALL_POKEMONS_BY_NAMES = gql`
  query getPokemonGroupByName($names: [String]!) {
    getPokemonGroupByName(names: $names) {
      pokemonId
      type
      type2
      pokedex {
        pokemonNum
      }
    }
  }
`;

export default function RaidTier(props) {
  const { id, tier } = props;
  const pokemonQuery = tier.map((pokemon) => pokemon.pokemon);

  const { data, loading, error } = useQuery(GET_ALL_POKEMONS_BY_NAMES, {
    variables: { names: pokemonQuery },
  });

  if (error) return null;
  if (loading) return null;

  const { getPokemonGroupByName } = data;

  return (
    <>
      <h3>{id.replace(/[^0-9]/g, '')}</h3>
      <Tier>
        {getPokemonGroupByName.map((pokemon) => (
          <RaidCard
            key={pokemon.pokemonId}
            id={pokemon.pokedex.pokemonNum}
            name={pokemon.pokemonId}
            type={pokemon.type}
            type2={pokemon.type2}
          />
        ))}
      </Tier>
    </>
  );
}

RaidTier.propTypes = {
  id: PropTypes.string.isRequired,
  tier: PropTypes.oneOfType([PropTypes.array]).isRequired,
};
