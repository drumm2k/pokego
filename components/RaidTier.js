import styled from 'styled-components';
import PropTypes, { object } from 'prop-types';
import RaidCard from './RaidCard';

const TierTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 0;
`;

const Tier = styled.div`
  display: grid;
  grid-row-gap: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    grid-column-gap: 2%;
    grid-template-columns: 49% 49%;
  }
`;

export default function RaidTier(props) {
  const { id, tiersData, pokemonsData } = props;

  // Filter pokemons data by name shaped as tiers data
  const filteredData = tiersData.map((tier) =>
    pokemonsData.find((pokemon) => {
      if (pokemon.pokemonId === tier.pokemon) {
        // Add shiny field from tiers data
        const pokemonData = pokemon;
        pokemonData.shiny = tier.shiny;
        return pokemonData;
      }
      return null;
    })
  );

  const tier = id.replace(/[^0-9]/g, '');
  const tierIcon = [...Array(parseInt(tier, 10))].map((e, index) => {
    const key = tier + index;
    return (
      <img src="/img/raid.png" height="30" width="30" alt="raid tier" key={key} />
    );
  });

  return (
    <>
      <TierTitle>
        <h3>Уровень {tier}</h3>
        <div>{tierIcon}</div>
      </TierTitle>

      <Tier>
        {filteredData.map((pokemon) => (
          <RaidCard
            key={pokemon.pokemonId}
            id={pokemon.pokedex.pokemonNum}
            name={pokemon.pokemonId}
            type={pokemon.type}
            type2={pokemon.type2}
            shiny={pokemon.shiny}
          />
        ))}
      </Tier>
    </>
  );
}

RaidTier.propTypes = {
  id: PropTypes.string.isRequired,
  tiersData: PropTypes.arrayOf(object).isRequired,
  pokemonsData: PropTypes.arrayOf(object).isRequired,
};
