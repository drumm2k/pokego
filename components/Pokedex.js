import { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PokedexList from './PokedexList';
import PokedexModal from './PokedexModal';
import Checkbox from './Checkbox';

const FilterTabs = styled.ul`
  display: flex;
  text-align: center;
  flex-wrap: wrap;
  color: #000;
`;

const FilterTabsItem = styled.li`
  flex: 1 1 0%;
  display: block;
  padding: 0.5rem 2rem;
  border: 1px solid rgb(220, 220, 220);
  border-bottom: 1px solid rgb(220, 220, 220);
  border-radius: 10px 10px 0 0;
  background-color: rgb(245, 245, 245);
  cursor: pointer;

  &.tab-active {
    background-color: transparent;
    border: 1px solid rgb(150, 150, 150);
    border-bottom: none;
  }
`;

const FiltersContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
`;

const FilterSearchInput = styled.input`
  width: 100%;
  border: 1px solid rgb(220, 220, 220);
  padding: 0.5rem 1rem;

  &:focus {
    background-color: transparent;
    border: 1px solid rgb(150, 150, 150);
    box-shadow: 0 0 0 0.2rem rgba(150, 150, 150, 0.5);
    outline: none;
  }
`;

const StyledSelect = styled.select`
  border: 1px solid rgb(220, 220, 220);
  width: 20rem;
  margin: 0.5rem 0;
  /* appearance: none; */
  padding: 0.5rem 1rem;

  &:focus {
    border: 1px solid rgb(150, 150, 150);
    box-shadow: 0 0 0 0.2rem rgba(150, 150, 150, 0.5);
    outline: none;
  }
`;

export default class Pokedex extends Component {
  constructor(props) {
    super(props);
    const { pokemons } = this.props;
    this.state = {
      searchTerm: '',
      pokemonsData: pokemons,
      gen: 'GEN_1 GEN_2 GEN_3 GEN_4 GEN_5 GEN_7 GEN_8',
      activeTab: 'released',
      legendaryOnly: false,
      modalStatus: false,
      modalPokemonData: null,
    };
  }

  filterSearch = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  filterGen = (event) => {
    const { gen } = this.state;

    if (event.target.value === 'All') {
      this.setState({
        gen: 'GEN_1 GEN_2 GEN_3 GEN_4 GEN_5 GEN_7 GEN_8',
      });
    } else {
      this.setState({ gen: event.target.value });
    }
  };

  filterLegendary = () => {
    this.setState((prevState) => ({
      legendaryOnly: !prevState.legendaryOnly,
    }));
  };

  filterTabs = (event) => {
    this.setState({ activeTab: event.target.dataset.tab });
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
      activeTab,
      legendaryOnly,
      modalStatus,
      modalPokemonData,
    } = this.state;

    const filteredPokemons = pokemonsData.filter((pokemon) => {
      // Filter by search and gen checkboxes
      let filter =
        gen.includes(pokemon.gen) &&
        (pokemon.pokedex.toString() === searchTerm ||
          pokemon.name.includes(searchTerm.toUpperCase()));

      // Filter if legendary checkbox active
      if (legendaryOnly) filter = pokemon.pokemonClass && filter;

      // Filter by tabs
      switch (activeTab) {
        case 'released':
          return pokemon.released && filter;
        case 'unreleased':
          return !pokemon.released && filter;
        case 'shiny':
          return pokemon.shiny && filter;
        case 'legendary':
          return pokemon.pokemonClass && filter;
        default:
          return filter;
      }
    });

    return (
      <>
        <FilterTabs>
          <FilterTabsItem
            onClick={this.filterTabs}
            className={activeTab === 'released' && 'tab-active'}
            data-tab="released"
          >
            В игре
          </FilterTabsItem>
          <FilterTabsItem
            onClick={this.filterTabs}
            className={activeTab === 'unreleased' && 'tab-active'}
            data-tab="unreleased"
          >
            Ожидаются
          </FilterTabsItem>
          <FilterTabsItem
            onClick={this.filterTabs}
            className={activeTab === 'shiny' && 'tab-active'}
            data-tab="shiny"
          >
            Шайни
          </FilterTabsItem>
        </FilterTabs>
        <FiltersContainer>
          <FilterSearchInput
            type="text"
            name="search"
            placeholder="Введите имя или номер покемона"
            value={searchTerm}
            onChange={this.filterSearch}
          />

          <StyledSelect
            value={gen}
            onChange={this.filterGen}
            aria-expanded="false"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            role="combobox"
          >
            <option defaultValue value="All">
              Все поколения
            </option>
            <option value="GEN_1">1 - Kanto</option>
            <option value="GEN_2">2 - Johto</option>
            <option value="GEN_3">3 - Hoenn</option>
            <option value="GEN_4">4 - Sinnoh</option>
            <option value="GEN_5">5 - Unova</option>
            <option value="GEN_7">7 - Aloha</option>
            <option value="GEN_8">8 - Galar</option>
          </StyledSelect>

          <Checkbox
            label="Только легендарные и мифические"
            checked={legendaryOnly}
            onChange={this.filterLegendary}
          />
        </FiltersContainer>

        <PokedexList
          pokemons={filteredPokemons}
          showModal={this.showModal}
          activeTab={activeTab}
        />
        <PokedexModal
          showModal={this.showModal}
          modalStatus={modalStatus}
          modalPokemonData={modalPokemonData}
        />
      </>
    );
  }
}

Pokedex.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
};
