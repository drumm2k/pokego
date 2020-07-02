import { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PokedexList from './PokedexList';
import PokedexModal from './PokedexModal';

const FilterTabs = styled.ul`
  display: flex;
  text-align: center;
  flex-wrap: wrap;
  border: 1px solid rgb(216, 216, 220);
  border-radius: 5px;
`;

const FilterTabsItem = styled.li`
  flex: 1 1 0%;
  display: block;
  margin: 0.5rem;
  padding: 0.5rem 2rem;
  border-radius: 5px;
  color: #000;

  &:hover {
    background-color: rgb(216, 216, 220);
    cursor: pointer;
  }

  &.tab-active {
    color: #fff;
    background-color: rgb(108, 108, 112);
  }
`;

const FilterSearch = styled.input`
  margin: 1rem;
`;

const FilterGen = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FilterCheckboxLabel = styled.label`
  margin-right: 1rem;
`;

const FilterCheckbox = styled.input`
  height: 1.6rem;
  width: 1.6rem;
  margin-right: 0.5rem;
`;

const filterGen = [
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

        <div>
          <label>
            Поиск:
            <FilterSearch
              type="text"
              name="search"
              value={searchTerm}
              onChange={this.filterSearch}
            />
          </label>
        </div>

        <FilterGen>
          {filterGen.map((item) => (
            <FilterCheckboxLabel key={item.name}>
              <FilterCheckbox
                type="checkbox"
                name={item.name}
                defaultChecked
                onChange={this.filterGen}
              />
              {item.label}
            </FilterCheckboxLabel>
          ))}
        </FilterGen>

        <div>
          <label>
            <FilterCheckbox type="checkbox" onChange={this.filterLegendary} />
            Только легендарные и мифические
          </label>
        </div>

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
