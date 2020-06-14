import styled from 'styled-components';
import PropTypes from 'prop-types';
import PokeCard from './PokeCard';

const PokeList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function PokedexList({ pokemons }) {
  return (
    <PokeList>
      {pokemons.map((pokemon) => (
        <PokeCard
          key={pokemon.pokemonId}
          id={parseInt(pokemon.pokedex.pokemonNum, 10)}
          name={pokemon.pokemonId}
          gen={pokemon.pokedex.gen}
          type={pokemon.type}
          type2={pokemon.type2}
        />
      ))}
    </PokeList>
  );
}

PokedexList.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PokedexList;
