import styled from 'styled-components';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Title = styled.h2`
  color: #ff3163;
  margin-bottom: 1.5rem;
`;

function Raids() {
  const { data, error } = useSWR('/api/raids', fetcher);

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

  const tier1 = data.raids.tiers[0].raids;
  const tier2 = data.raids.tiers[2].raids;
  const tier3 = data.raids.tiers[4].raids;
  const tier4 = data.raids.tiers[6].raids;
  const tier5 = data.raids.tiers[12].raids;

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
