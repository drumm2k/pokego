import { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PokedexList from './PokedexList';

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

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
    };
  }

  searchFilter = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  genFilter = (event) => {
    const { pokemonsData } = this.state;
    const { pokemons } = this.props;

    if (event.target.checked) {
      const addGen = pokemons.filter((pokemon) => pokemon.gen === event.target.name);

      const result = pokemonsData.concat(addGen);

      // Sorting is too slow
      // (maybe need to create an array for each generation or just hide them)

      // result.sort(
      //   (a, b) =>
      //     parseInt(a.pokedex.pokemonNum, 10) > parseInt(b.pokedex.pokemonNum, 10)
      // );

      this.setState({ pokemonsData: result });
    } else {
      const result = pokemonsData.filter(
        (pokemon) => pokemon.gen !== event.target.name
      );
      this.setState({ pokemonsData: result });
    }
  };

  render() {
    const { pokemonsData, searchTerm } = this.state;

    // NEED TO FIX - When searching "2" there is Porygon2
    const filteredPokemons = pokemonsData.filter(
      (pokemon) =>
        pokemon.pokedex.toString() === searchTerm ||
        pokemon.name.includes(searchTerm.toUpperCase())
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

        <PokedexList pokemons={filteredPokemons} />
      </>
    );
  }
}

Pokedex.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
};
