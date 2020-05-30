import styled from 'styled-components';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';

const Title = styled.h2`
  color: #ff3163;
  margin-bottom: 1.5rem;
`;

function Raids() {
  //
  // TODO: Load raids by Tier
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
      <h4>Tier1</h4>
      {tier1.map((pokemon) => (
        <p key={pokemon.pokemon}>{pokemon.pokemon}</p>
      ))}
      <h4>Tier2</h4>
      {tier2.map((raids) => (
        <p key={raids.pokemon}>{raids.pokemon}</p>
      ))}
      <h4>Tier3</h4>
      {tier3.map((raids) => (
        <p key={raids.pokemon}>{raids.pokemon}</p>
      ))}
      <h4>Tier4</h4>
      {tier4.map((raids) => (
        <p key={raids.pokemon}>{raids.pokemon}</p>
      ))}
      <h4>Tier5</h4>
      {tier5.map((raids) => (
        <p key={raids.pokemon}>{raids.pokemon}</p>
      ))}
    </div>
  );
}

export default Raids;
