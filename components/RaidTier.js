import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

const Tier = styled.div`
  display: grid;
  grid-row-gap: 1rem;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    grid-column-gap: 1rem;
    grid-template-columns: 50% 50%;
  }
`;

const TierItem = styled.div`
  color: #fcd768;
  font-size: 1.6rem;
  font-weight: 700;
  display: grid;
  grid-template-columns: 7rem auto;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  padding: 1.5rem 1rem;
  border-radius: 10px;
  min-width: 30rem;
  background-image: linear-gradient(to right, #0082c8, #3a5888);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const RaidImg = styled.div`
  background: url(${(props) => props.imgUrl}) 50% 50% no-repeat;
  background-size: cover;
  width: 7.5rem;
  height: 7.5rem;
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
            <RaidImg imgUrl={`/img/pokemon/${pokemon.pokedex.pokemonNum}.png`} />

            <div>
              <div>{pokemon.pokemonId}</div>
              <div>{pokemon.type}</div>
              <div>{pokemon.type2}</div>
            </div>
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
