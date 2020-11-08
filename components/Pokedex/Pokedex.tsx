import { Checkbox, Input, Label, Select } from 'components/UI';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import PokedexList from './PokedexList';
import { PokedexModal } from './PokedexModal';

export function Pdex({ pokemons }: { pokemons: any }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [gen, setGen] = useState('GEN_5');
  const [activeTab, setActiveTab] = useState('released');
  const [legendaryOnly, setLegendaryOnly] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalPokemonData, setModalPokemonData] = useState(null);

  const filterSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filterGen = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'All') {
      setGen('GEN_1 GEN_2 GEN_3 GEN_4 GEN_5 GEN_7 GEN_8');
    } else {
      setGen(event.target.value);
    }
  };

  const filterLegendary = () => {
    setLegendaryOnly((prev) => !prev);
  };

  const filterTabs = (event: any) => {
    setActiveTab(event.target.dataset.tab);
  };

  const showModal = (name?: string) => {
    if (modalStatus) {
      // Only need to lock scrolling on Mobile devices
      // document.body.style.overflow = 'unset';
      setModalStatus((prev) => !prev);
    } else {
      // document.body.style.overflow = 'hidden';

      // Change this find by ID (need to change query)
      const pokemonData = pokemons.find((pokemon: any) => pokemon.name === name);
      setModalStatus((prev) => !prev);
      setModalPokemonData(pokemonData);
    }
  };

  const filteredPokemons = pokemons.filter((pokemon: any) => {
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
          <Select value={gen} onChange={filterGen}>
            <option value="All">Все</option>
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
          <Checkbox checked={legendaryOnly} onChange={filterLegendary} />
          Только легендарные и мифические
        </Label>
        <Label>
          Поиск
          <Input
            type="text"
            name="search"
            placeholder="Имя или номер покемона"
            value={searchTerm}
            onChange={filterSearch}
          />
        </Label>
      </FiltersContainer>

      <Tabs>
        <TabsItem
          onClick={filterTabs}
          className={activeTab === 'released' && 'tab-active'}
          data-tab="released"
        >
          В игре
        </TabsItem>
        <TabsItem
          onClick={filterTabs}
          className={activeTab === 'unreleased' && 'tab-active'}
          data-tab="unreleased"
        >
          Ожидаются
        </TabsItem>
        <TabsItem
          onClick={filterTabs}
          className={activeTab === 'shiny' && 'tab-active'}
          data-tab="shiny"
        >
          Шайни
        </TabsItem>
      </Tabs>
      <PokedexList
        pokemons={filteredPokemons}
        showModal={showModal}
        activeTab={activeTab}
      />
      <PokedexModal
        showModal={showModal}
        modalStatus={modalStatus}
        modalPokemonData={modalPokemonData}
      />
    </>
  );
}

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

const TabsItem = styled.li<{ className: any }>`
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
