import styled from 'styled-components';
import PropTypes from 'prop-types';
import PokeCard from './PokeCard';

const PokeList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PokedexNotFound = styled.div`
  display: flex;
  margin-top: 4rem;
  justify-content: center;
`;

function PokedexList({ pokemons, showModal, activeTab }) {
  return (
    <>
      {!pokemons.length && <PokedexNotFound>Покемонов не найдено</PokedexNotFound>}
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
            activeTab={activeTab}
            enableModal
          />
        ))}
      </PokeList>
    </>
  );
}

export default PokedexList;

PokedexList.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
  showModal: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
};
