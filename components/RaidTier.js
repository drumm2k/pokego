import styled from 'styled-components';
import useSWR from 'swr';
import PokeCard from './PokeCard';
import fetcher from '../lib/fetcher';

const Tier = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const TierItem = styled.div`
  padding: 1rem;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RaidTier = (props) => {
  let tierQuery = '';
  props.tier.map((pokemon) => {
    tierQuery += `${pokemon.pokemon}: getPokemonByName(name: "${pokemon.pokemon}") { pokedex { pokemonNum } }`;
  });

  const { data, error } = useSWR(`query { ${tierQuery} }`, fetcher);

  if (error)
    return (
      <div>
        <p>Ошибка, не удалось загрузить данные...</p>
      </div>
    );

  if (!data)
    return (
      <div>
        <p>Загружаю данные...</p>
      </div>
    );

  // const tier1 = data.getRaids.raids;

  return (
    <>
      <h4>Tier {props.id}</h4>
      <Tier>
        {Object.keys(data).map((pokemon) => (
          <TierItem>
            <PokeCard
              key={pokemon}
              id={parseInt(data[pokemon].pokedex.pokemonNum)}
            />
            <p>{pokemon}</p>
          </TierItem>
        ))}
      </Tier>
    </>
  );
};

export default RaidTier;
