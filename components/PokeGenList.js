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
  border: 2px solid white;
  margin: 2px;

  &.selected {
    border: 2px solid green;
  }
`;

let firstPokemon, lastPokemon;

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

let pokemons = [];
for (let id = firstPokemon; id <= lastPokemon; id++) {
  pokemons.push(id);
}

const INITIAL_STATE = {
  pokemons: pokemons,
  selectedPokemons: [1, 2, 3, 4, 5],
};

class PokeGenList extends React.Component {
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
        ></FilterInput>
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
