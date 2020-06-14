import styled from 'styled-components';
import PropTypes from 'prop-types';
import PokeCard from './PokeCard';

const PokeList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledCard = styled.div`
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #edf2f4;
  margin: 1px;
`;

function PokedexList({ pokemons }) {
  return (
    <PokeList>
      {pokemons.map((pokemon) => (
        <StyledCard key={pokemon.pokemonId}>
          <PokeCard
            id={parseInt(pokemon.pokedex.pokemonNum, 10)}
            name={pokemon.pokemonId}
            gen={pokemon.pokedex.gen}
          />
        </StyledCard>
      ))}
    </PokeList>
  );
}

PokedexList.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PokedexList;
