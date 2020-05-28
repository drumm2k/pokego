import styled from 'styled-components';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Event from '../../components/Event';

const Title = styled.h2`
  color: #ff3163;
  margin-bottom: 1.5rem;
`;

const fetcher = (query) =>
  fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

const EventById = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(
    `{ getEvent(id: ${id}) { id, name, desc, start, end, img } }`,
    fetcher
  );

  if (error)
    return (
      <div>
        <Title>Ивент</Title> Ошибка, не удалось загрузить данные...
      </div>
    );
  if (!data)
    return (
      <div>
        <Title>Ивент</Title> Загружаю данные...
      </div>
    );

  const { getEvent } = data;

  return (
    <div>
      <Title>{getEvent.name}</Title>
      <Event
        name={getEvent.name}
        desc={getEvent.desc}
        start={getEvent.start}
        end={getEvent.end}
        img={getEvent.img}
      />
    </div>
  );
};

export default EventById;
