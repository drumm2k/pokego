import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { withApollo } from '../lib/apollo';
import PokeCard from './PokeCard';

const Tier = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const TierItem = styled.div`
  padding: 1rem;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
          <TierItem key={pokemon.pokemonId}>
            <PokeCard
              imgUrl={`/img/pokemon/${pokemon.pokedex.pokemonNum}.png`}
              id={pokemon.pokedex.pokemonNum}
            />
            <p>{pokemon.pokemonId.toLowerCase()}</p>
          </TierItem>
        ))}
      </Tier>
    </>
  );
}

RaidTier.propTypes = {
  id: PropTypes.string.isRequired,
  tier: PropTypes.oneOfType([PropTypes.array]).isRequired,
};
