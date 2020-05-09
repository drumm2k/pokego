import styled from 'styled-components';
import PokeCard from './PokeCard';

const PokeList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PokeGenList = (props) => {
  let firstPokemon, lastPokemon;
  if (props.gen === 1) {
    firstPokemon = 1;
    lastPokemon = 151;
  }
  switch (props.gen) {
    case '1':
      firstPokemon = 1;
      lastPokemon = 151;
      break;
    case '2':
      firstPokemon = 152;
      lastPokemon = 180;
      break;
    default:
      console.log('This genereation of pokemons has not been found');
  }

  let pokemons = [];
  for (let id = firstPokemon; id <= lastPokemon; id++) {
    pokemons.push(<PokeCard key={id} id={id} width={7} height={7} />);
  }

  return (
    <div>
      <h3>Generation: {props.gen}</h3>
      <PokeList>{pokemons}</PokeList>
    </div>
  );
};

export default PokeGenList;
