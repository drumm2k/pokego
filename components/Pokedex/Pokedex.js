import PropTypes from 'prop-types';
import { Component } from 'react';
import styled from 'styled-components';
import { Checkbox, Input, Label, Select } from '../UI.tsx';
import PokedexList from './PokedexList';
import { PokedexModal } from './PokedexModal';

const FiltersContainer = styled.section`
  display: grid;
  grid-gap: ${(p) => p.theme.spacing.s4};
  width: 100%;
  padding: ${(p) => p.theme.spacing.s4};
  margin: ${(p) => p.theme.spacing.s4} 0;
  border: ${(p) => p.theme.border.border300};
  border-radius: ${(p) => p.theme.border.radius200};
  box-shadow: ${(p) => p.theme.lighting.shadow100};
`;

const Tabs = styled.ul`
  display: flex;
  text-align: center;
  flex-wrap: wrap;
  color: ${(p) => p.theme.color.black};
  margin-bottom: ${(p) => p.theme.spacing.s3};
`;

const TabsItem = styled.li`
  flex: 1 1 0%;
  display: block;
  padding: ${(p) => p.theme.spacing.s2} ${(p) => p.theme.spacing.s8};
  border: ${(p) => p.theme.border.border100};
  border-bottom: ${(p) => p.theme.border.border300};
  border-radius: ${(p) => p.theme.border.radius400}
    ${(p) => p.theme.border.radius400} 0 0;
  background-color: ${(p) => p.theme.color.gray50};
  cursor: pointer;

  &.tab-active {
    background-color: transparent;
    border: ${(p) => p.theme.border.border300};
    border-bottom: none;
  }
`;

export class Pdex extends Component {
  constructor(props) {
    super(props);
    const { pokemons } = this.props;
    this.state = {
      searchTerm: '',
      pokemonsData: pokemons,
      gen: 'GEN_5',
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
    const { modalStatus, pokemonsData } = this.state;

    if (modalStatus) {
      // Only need to lock scrolling on Mobile devices
      // document.body.style.overflow = 'unset';
      this.setState((prevState) => ({
        modalStatus: !prevState.modalStatus,
      }));
    } else {
      // document.body.style.overflow = 'hidden';

      // Change this find by ID (need to change query)
      const pokemonData = pokemonsData.find((pokemon) => pokemon.name === name);
      this.setState((prevState) => ({
        modalStatus: !prevState.modalStatus,
        modalPokemonData: pokemonData,
      }));
    }
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
        <FiltersContainer>
          <Label>
            Поколение
            <Select value={gen} onChange={this.filterGen}>
              <option defaultValue value="All">
                Все
              </option>
              <option value="GEN_1">1 - Kanto</option>
              <option value="GEN_2">2 - Johto</option>
              <option value="GEN_3">3 - Hoenn</option>
              <option value="GEN_4">4 - Sinnoh</option>
              <option value="GEN_5">5 - Unova</option>
              <option value="GEN_7">7 - Alola</option>
              <option value="GEN_8">8 - Galar</option>
            </Select>
          </Label>
          <Label>
            <Checkbox checked={legendaryOnly} onChange={this.filterLegendary} />
            Только легендарные и мифические
          </Label>
          <Label>
            Поиск
            <Input
              type="text"
              name="search"
              placeholder="Имя или номер покемона"
              value={searchTerm}
              onChange={this.filterSearch}
            />
          </Label>
        </FiltersContainer>

        <Tabs>
          <TabsItem
            onClick={this.filterTabs}
            className={activeTab === 'released' && 'tab-active'}
            data-tab="released"
          >
            В игре
          </TabsItem>
          <TabsItem
            onClick={this.filterTabs}
            className={activeTab === 'unreleased' && 'tab-active'}
            data-tab="unreleased"
          >
            Ожидаются
          </TabsItem>
          <TabsItem
            onClick={this.filterTabs}
            className={activeTab === 'shiny' && 'tab-active'}
            data-tab="shiny"
          >
            Шайни
          </TabsItem>
        </Tabs>
        <PokedexList
          pokemons={filteredPokemons}
          showModal={this.showModal}
          activeTab={activeTab}
          modalPokemonData={modalPokemonData}
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

Pdex.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
};
