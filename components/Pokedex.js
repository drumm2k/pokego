import { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PokedexList from './PokedexList';

const FilterInput = styled.input`
  width: 100%;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

export default class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { pokemons } = this.props;
    return (
      <>
        <FilterInput />
        <PokedexList pokemons={pokemons} />
      </>
    );
  }
}

Pokedex.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
};
