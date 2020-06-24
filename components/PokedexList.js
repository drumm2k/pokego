import styled from 'styled-components';
import PropTypes from 'prop-types';
import PokeCard from './PokeCard';
import PokedexModal from './PokedexModal';

const PokeList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function PokedexList({ pokemons, modalStatus, showModal, modalPokemonData }) {
  return (
    <>
      <PokedexModal
        showModal={showModal}
        modalStatus={modalStatus}
        modalPokemonData={modalPokemonData}
      />

      <PokeList>
        {pokemons.map((pokemon) => (
          <PokeCard
            key={pokemon.name}
            pokedex={pokemon.pokedex}
            name={pokemon.name}
            gen={pokemon.gen}
            type1={pokemon.type1}
            type2={pokemon.type2}
            showModal={showModal}
          />
        ))}
      </PokeList>
    </>
  );
}

PokedexList.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
  modalStatus: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  modalPokemonData: PropTypes.oneOfType([PropTypes.object]),
};

PokedexList.defaultProps = {
  modalPokemonData: null,
};

export default PokedexList;
