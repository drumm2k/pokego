import { Component } from 'react';
import styled from 'styled-components';
import PokeCard from './PokeCard';

const FilterInput = styled.input`
  width: 70%;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const PokeList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PokeSelector = styled.div`
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #edf2f4;
  margin: 1px;

  &.selected {
    border-color: #25ced1;
  }
`;

const input = '1, 2,3-5,,,a%#.//!';

function formatInput(val) {
  // Remove everything except number and , -
  let result = val.replace(/[^0-9,-]/g, '');

  // If no , and - return result
  if (result.slice(-1) !== ',' && result.slice(-1) !== '-') {
    return result;
  }

  // Remove last character
  result = result.slice(0, -1);
  return formatInput(result);
}

const output = formatInput(input);
console.log(output);

let firstPokemon;
let lastPokemon;

switch (1) {
  case 1:
    firstPokemon = 1;
    lastPokemon = 151;
    break;
  case 2:
    firstPokemon = 152;
    lastPokemon = 180;
    break;
  default:
    console.log('This genereation of pokemons has not been found');
}

const pokemons = [];
for (let id = firstPokemon; id <= lastPokemon; id += 1) {
  pokemons.push(id);
}

const INITIAL_STATE = {
  pokemons,
  selectedPokemons: [1, 2, 3, 4, 5],
};

class PokeGenList extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
  }

  onResetArray = () => {
    this.setState({ ...INITIAL_STATE });
  };

  selectPokemon = (id) => {
    this.setState((state) => {
      let selectedPokemons;

      if (this.state.selectedPokemons.includes(id)) {
        selectedPokemons = state.selectedPokemons.filter((x) => x !== id);
      } else {
        selectedPokemons = [...state.selectedPokemons, id];
      }

      return {
        selectedPokemons,
      };
    });
  };

  fiterInputHandler = (e) => {
    console.log(e.currentTarget.value);
    // TODO - implement update of the state on input change
  };

  render() {
    return (
      <div>
        <FilterInput
          type="text"
          value={this.state.selectedPokemons}
          onChange={(e) => this.fiterInputHandler(e)}
        />
        <button type="button" onClick={this.onResetArray}>
          Reset
        </button>
        <PokeList>
          {this.state.pokemons.map((id) => (
            <PokeSelector
              key={id}
              className={
                this.state.selectedPokemons.includes(id) ? 'selected' : null
              }
              onClick={() => this.selectPokemon(id)}
            >
              <PokeCard id={id} width={6.5} height={6.5} />
            </PokeSelector>
          ))}
        </PokeList>
      </div>
    );
  }
}
export default PokeGenList;
