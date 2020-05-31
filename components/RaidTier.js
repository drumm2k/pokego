import styled from 'styled-components';
import useSWR from 'swr';
import PropTypes from 'prop-types';
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
  const { id, tier } = props;

  const tierQuery = tier.map((pokemon) => {
    let request = '';
    request += `${pokemon.pokemon}: getPokemonByName(name: "${pokemon.pokemon}") { pokedex { pokemonNum } }`;
    return request;
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

  return (
    <>
      <h4>
        Tier
        {id}
      </h4>
      <Tier>
        {Object.keys(data).map((pokemon) => (
          <TierItem>
            <PokeCard
              key={pokemon}
              id={parseInt(data[pokemon].pokedex.pokemonNum, 10)}
            />
            <p>{pokemon}</p>
          </TierItem>
        ))}
      </Tier>
    </>
  );
};

RaidTier.propTypes = {
  id: PropTypes.string.isRequired,
  tier: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default RaidTier;
