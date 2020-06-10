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
    this.state = { searchTerm: '', pokemons: this.props.pokemons };
  }

  onChangeValue = (event) => {
    const result = this.props.pokemons.filter(
      (pokemon) =>
        pokemon.pokedex.pokemonNum == event.target.value ||
        pokemon.pokemonId.includes(event.target.value.toUpperCase())
    );
    this.setState({ searchTerm: event.target.value, pokemons: result });
  };

  render() {
    const { pokemons } = this.state;
    return (
      <>
        <label>
          Поиск:
          <FilterInput
            type="text"
            name="search"
            value={this.state.searchTerm}
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
