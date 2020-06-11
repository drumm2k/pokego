import styled from 'styled-components';
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

export default function RaidTier(props) {
  const { id, tiersData, pokemonsData } = props;

  const filteredData = tiersData.map((tier) =>
    pokemonsData.find((pokemon) => pokemon.pokemonId === tier.pokemon)
  );

  return (
    <>
      <h3>{id.replace(/[^0-9]/g, '')}</h3>
      <Tier>
        {filteredData.map((pokemon) => (
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
  tiersData: PropTypes.arrayOf(PropTypes.object).isRequired,
  pokemonsData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
