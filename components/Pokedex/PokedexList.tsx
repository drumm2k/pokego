import { PokeCard, PokeCardType } from 'components/PokeCard';
import styled from 'styled-components';

interface PokedexListType {
  pokemons: any;
  showModal: (name: any) => void;
  activeTab: string;
}

export default function PokedexList({
  pokemons,
  showModal,
  activeTab,
}: PokedexListType) {
  return (
    <>
      {!pokemons.length && <PokedexNotFound>Покемонов не найдено</PokedexNotFound>}
      <PokeList>
        {pokemons.map((pokemon: PokeCardType) => (
          <PokeCard
            key={pokemon.name}
            pokedex={pokemon.pokedex}
            name={pokemon.name}
            gen={pokemon.gen}
            type1={pokemon.type1}
            type2={pokemon.type2}
            showModal={showModal}
            activeTab={activeTab}
            enableModal
          />
        ))}
      </PokeList>
    </>
  );
}

const PokeList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PokedexNotFound = styled.div`
  display: flex;
  margin-top: ${(p) => p.theme.spacing.s16};
  justify-content: center;
`;
