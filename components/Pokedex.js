import { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PokedexList from './PokedexList';

const FilterInput = styled.input`
  width: 20rem;
  margin: 1rem;
`;

const FilterGen = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FilterGenItem = styled.label`
  width: 7rem;
  margin-right: 1rem;
`;

const FilterGenCheckbox = styled.input`
  margin-right: 0.5rem;
`;

const genFilters = [
  {
    name: 'GEN_1',
    label: 'Gen 1',
  },
  {
    name: 'GEN_2',
    label: 'Gen 2',
  },
  {
    name: 'GEN_3',
    label: 'Gen 3',
  },
  {
    name: 'GEN_4',
    label: 'Gen 4',
  },
  {
    name: 'GEN_5',
    label: 'Gen 5',
  },
  {
    name: 'GEN_7',
    label: 'Gen 7',
  },
  {
    name: 'GEN_8',
    label: 'Gen 8',
  },
];

export default class Pokedex extends Component {
  constructor(props) {
    super(props);
    const { pokemons } = this.props;
    this.state = {
      searchTerm: '',
      pokemonsData: pokemons,
      gen: ['GEN_1', 'GEN_2', 'GEN_3', 'GEN_4', 'GEN_5', 'GEN_7', 'GEN_8'],
      modalStatus: false,
      modalPokemonData: null,
    };
  }

  searchFilter = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  genFilter = (event) => {
    const { gen } = this.state;

    if (event.target.checked) {
      const result = gen;
      result.push(event.target.name);
      this.setState({ gen: result.sort() });
    } else {
      const result = gen.filter((item) => {
        return item !== event.target.name;
      });
      this.setState({ gen: result });
    }
  };

  showModal = (name) => {
    const { pokemonsData } = this.state;
    const pokemonData = pokemonsData.filter((pokemon) => pokemon.name === name);
    this.setState((prevState) => ({
      modalStatus: !prevState.modalStatus,
      modalPokemonData: pokemonData[0],
    }));
  };

  render() {
    const {
      pokemonsData,
      searchTerm,
      gen,
      modalStatus,
      modalPokemonData,
    } = this.state;

    // NEED TO FIX - When searching "2" there is Porygon2
    const filteredPokemons = pokemonsData.filter(
      (pokemon) =>
        gen.includes(pokemon.gen) &&
        (pokemon.pokedex.toString() === searchTerm ||
          pokemon.name.includes(searchTerm.toUpperCase()))
    );

    return (
      <>
        <label>
          Поиск:
          <FilterInput
            type="text"
            name="search"
            value={searchTerm}
            onChange={this.searchFilter}
          />
        </label>

        <FilterGen>
          {genFilters.map((item) => (
            <FilterGenItem key={item.name}>
              <FilterGenCheckbox
                type="checkbox"
                name={item.name}
                defaultChecked
                onChange={this.genFilter}
              />
              {item.label}
            </FilterGenItem>
          ))}
        </FilterGen>

        <PokedexList
          pokemons={filteredPokemons}
          modalStatus={modalStatus}
          showModal={this.showModal}
          modalPokemonData={modalPokemonData}
        />
      </>
    );
  }
}

Pokedex.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
};
