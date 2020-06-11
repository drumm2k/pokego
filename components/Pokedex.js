import { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PokedexList from './PokedexList';

const FilterInput = styled.input`
  width: 20rem;
  margin: 1rem;
`;

export default class Pokedex extends Component {
  constructor(props) {
    super(props);
    const { pokemons } = this.props;
    this.state = { searchTerm: '', pokemons };
  }

  onChangeValue = (event) => {
    const { pokemons } = this.props;
    const result = pokemons.filter(
      (pokemon) =>
        pokemon.pokedex.pokemonNum === event.target.value ||
        pokemon.pokemonId.includes(event.target.value.toUpperCase())
    );
    this.setState({ searchTerm: event.target.value, pokemons: result });
  };

  render() {
    const { pokemons, searchTerm } = this.state;
    return (
      <>
        <label>
          Поиск:
          <FilterInput
            type="text"
            name="search"
            value={searchTerm}
            onChange={this.onChangeValue}
          />
        </label>

        <PokedexList pokemons={pokemons} />
      </>
    );
  }
}

Pokedex.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
};
