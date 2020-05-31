import styled from 'styled-components';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import RaidTier from '../components/RaidTier';

const Title = styled.h2`
  color: #ff3163;
  margin-bottom: 1.5rem;
`;

function Raids() {
  //
  // TODO: Query all pokemons at once, not 5 times from RaidTier component
  //
  const { data, error } = useSWR(
    'query { getRaids { raids { pokemon } } }',
    fetcher
  );

  if (error)
    return (
      <div>
        <Title>Рейды</Title>
        <p>Ошибка, не удалось загрузить данные...</p>
      </div>
    );
  if (!data)
    return (
      <div>
        <Title>Рейды</Title>
        <p>Загружаю данные...</p>
      </div>
    );

  const tier1 = data.getRaids[0].raids;
  const tier2 = data.getRaids[2].raids;
  const tier3 = data.getRaids[4].raids;
  const tier4 = data.getRaids[6].raids;
  const tier5 = data.getRaids[12].raids;

  return (
    <div>
      <Title>Рейды</Title>
      <RaidTier id={1} tier={tier1} />
      <RaidTier id={2} tier={tier2} />
      <RaidTier id={3} tier={tier3} />
      <RaidTier id={4} tier={tier4} />
      <RaidTier id={5} tier={tier5} />
    </div>
  );
}

export default Raids;
